import { Injectable } from '@angular/core';
import sstore from './store';
import { SecretStore, SecretStoreStorage, SecretStoreMichelson, SecretStoreStorageMichelson, credentials } from './contract';
import { KeyStoreType, TezosNodeWriter, TezosParameterFormat, TezosConseilClient, OperationKindType, ConseilQueryBuilder, ConseilOperator, ConseilDataClient, TezosMessageUtils, KeyStoreCurve } from 'conseiljs';
import { SoftSigner } from 'conseiljs-softsigner';
var CryptoJS = require("crypto-js");
const bcrypt = require('bcryptjs');
const blake = require('blakejs');
const convert = (from: any, to:any) => (str: ArrayBuffer | SharedArrayBuffer) => Buffer.from(str, from).toString(to);
const utf8ToHex = convert('utf8', 'hex');
const hexToUtf8 = convert('hex', 'utf8');
const network = 'carthagenet';
const tezosNode = `https://tezos-dev.cryptonomic-infra.tech/`;
const conseilServer = {
  url: 'https://conseil-dev.cryptonomic-infra.tech:443',
  apiKey: 'galleon',
  network: network
};

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  public sstore = {
    state:{
        username:'',
        password:'',
        private_key:'',
        authed:false,
        show:false,
        msg:'Please wait ...',
        kt:''
    }
  };

  constructor() { }

  public async deployContract (initialNonce: number, initialHashedProof: string, michelson = false) {

    const keystore = {
      publicKey: credentials[network].publicKey,
      secretKey: credentials[network].privateKey,
      publicKeyHash: credentials[network].publicKeyHash,
      seed: '',
      curve: KeyStoreCurve.ED25519,
      storeType: KeyStoreType.Fundraiser
    };
    const fee = Number((await TezosConseilClient.getFeeStatistics(conseilServer, network, OperationKindType.Origination))[0]['high']);
    const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keystore.secretKey, 'edsk'));
    var nodeResult;

    if (michelson) {
      const contract = SecretStoreMichelson;

      const storage = SecretStoreStorageMichelson(initialNonce, initialHashedProof);

      nodeResult = await TezosNodeWriter.sendContractOriginationOperation(tezosNode, signer, keystore, 0, undefined,
        fee, 1000, 100_000, '', storage, TezosParameterFormat.Michelson);
    } else {
      const contract = JSON.stringify(SecretStore);

      const storage = JSON.stringify(SecretStoreStorage(initialNonce, initialHashedProof));

      nodeResult = await TezosNodeWriter.sendContractOriginationOperation(tezosNode, signer, keystore, 0, undefined,
        fee, 1000, 100_000, '', storage, TezosParameterFormat.Michelson);
    }

    const reg1 = /"/g;
    const reg2 = /\n/;
    const groupid = nodeResult['operationGroupID'].replace(reg1, '').replace(reg2, ''); // clean up RPC output
    const conseilResult = await TezosConseilClient.awaitOperationConfirmation(conseilServer, network, groupid, 5);
    return conseilResult;
  }

  public async invokeContract(KTAddress: string, params: any) {
    const keystore = {
      publicKey: credentials[network].publicKey,
      secretKey: credentials[network].privateKey,
      publicKeyHash: credentials[network].publicKeyHash,
      seed: '',
      storeType: KeyStoreType.Fundraiser,
      curve: KeyStoreCurve.ED25519
    };
    const signer = await SoftSigner.createSigner(TezosMessageUtils.writeKeyWithHint(keystore.secretKey, 'edsk'));
    const args = { "prim": "Pair", "args": [{ "prim": "Pair", "args": [{ "string": params.encryptedData }, { "bytes": params.hashedProof.replace('0x', '') }] }, { "bytes": params.proof.replace('0x', '') }] };

    var nodeResult;
    try {
      nodeResult = await TezosNodeWriter.sendContractInvocationOperation(tezosNode, signer, keystore, KTAddress as string,
        10000, 100000, 1000, 1000,
        undefined, JSON.stringify(args), TezosParameterFormat.Micheline);
    } catch (error) {
      return;
    }

    const reg1 = /"/g;
    const reg2 = /\n/;
    const groupid = nodeResult['operationGroupID'].replace(reg1, '').replace(reg2, ''); // clean up RPC output
    const conseilResult = await TezosConseilClient.awaitOperationConfirmation(conseilServer, network, groupid, 5);
    return conseilResult;
  }

  public async getStorage(KTAddress: String) {
    const entity = 'accounts';
    const platform = 'tezos';
    var accountQuery = ConseilQueryBuilder.blankQuery();
    accountQuery = ConseilQueryBuilder.addFields(accountQuery, 'storage');
    accountQuery = ConseilQueryBuilder.addPredicate(accountQuery, 'account_id', ConseilOperator.EQ, [KTAddress], false);
    accountQuery = ConseilQueryBuilder.setLimit(accountQuery, 1);

    var result;
    try {
      result = await ConseilDataClient.executeEntityQuery(conseilServer, platform, network, entity, accountQuery);
    } catch (error) {
      console.log(error);
      return;
    }

    console.log(result[0]);

    return result[0];
  }

  public async getSecrets(KTAddress: string) {
    const storage = await this.getStorage(KTAddress);
    const result = storage.storage.split(' ');

    const start = result.indexOf('{')+1;
    const end = result.indexOf('}');

    const secrets = result.slice(start, end).join('');
    console.log(secrets.split(';'));
    return secrets.split(';').map((secret:any)=>hexToUtf8(secret.slice(1,-1)));
  }

  public async getCurrentNonce(KTAddress: string) {
    const storage = await this.getStorage(KTAddress);

    const result = storage.storage.split(' ');

    const nonce = Number(result[result.length - 1]);

    return nonce;
  }

  public toKey(password: string, username: string) {
    return bcrypt.hash(password, 12);
  }

  public getKTAddress() {
    return localStorage.getItem('KTAddress');
  }

  public setKTAddress(KTAddress: string) {
    return localStorage.setItem('KTAddress', KTAddress);
  }

  public generateProof(private_key: string, nonce: string, hash = false) {
    const iv = CryptoJS.enc.Base64.parse(nonce);
    private_key = CryptoJS.enc.Utf8.parse(private_key);
    const proof = CryptoJS.AES.encrypt(nonce, private_key, { iv: iv }).toString();

    if (hash) {
      return '0x' + blake.blake2bHex(proof, null, 32);
    }

    return '0x' + utf8ToHex(proof);
  }

  public decryptData(dataCipher: any, pKey: string) {
    const dataStr = CryptoJS.AES.decrypt(dataCipher, pKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(dataStr);
  }
}
