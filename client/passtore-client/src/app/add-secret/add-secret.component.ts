import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';
import { Random } from 'random-js'

@Component({
  selector: 'app-add-secret',
  templateUrl: './add-secret.component.html',
  styleUrls: ['./add-secret.component.scss']
})
export class AddSecretComponent implements OnInit {

  public secret: string = '';

  constructor(public contractService: ContractService) { }

  ngOnInit(): void {
  }

  public async onSubmit() {
    if(this.contractService.getKTAddress()) {
      const hash = true;
      var currentNonce = await this.contractService.getCurrentNonce(this.contractService.getKTAddress() as string);
      const currentProof = this.contractService.generateProof(this.contractService.sstore.state.private_key, currentNonce.toString());
      const nextProofHash = this.contractService.generateProof(this.contractService.sstore.state.private_key, (++currentNonce).toString(), hash);
      await this.invokeSetSecret(currentProof, nextProofHash, this.secret, this.contractService.getKTAddress() as string);
      return;
    }

    var initialNonce = this.randInt();
      const hash = true;
      const initialHashedProof = this.contractService.generateProof(
        this.contractService.sstore.state.private_key,
        initialNonce.toString(),
        hash
      );

      const contract = await this.contractService.deployContract(initialNonce, initialHashedProof, true);

      console.log(contract);
  }

  private async invokeSetSecret(currentProof: string, nextProofHash: string, secret: string, KTAddress: string) {
    const params = {
      encryptedData: secret,
      hashedProof: nextProofHash,
      proof: currentProof
    };

    const results = await this.contractService.invokeContract(KTAddress, params);
    console.log(results);
  }

  private randInt() {
    const random = new Random(); // uses the nativeMath engine
    return random.integer(1, 2 ** 32);
  }

}
