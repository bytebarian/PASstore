export const SecretStore = [
  {
    "prim": "storage",
    "args": [
      {
        "prim": "pair",
        "args": [
          { "prim": "map", "args": [ { "prim": "bytes" }, { "prim": "string" } ], "annots": [ "%SecretStore" ] },
          { "prim": "pair", "args": [ { "prim": "bytes", "annots": [ "%hashedProof" ] }, { "prim": "int", "annots": [ "%nonce" ] } ] }
        ]
      }
    ]
  },
  {
    "prim": "parameter",
    "args": [
      {
        "prim": "pair",
        "args": [
          { "prim": "string", "annots": [ "%encryptedData" ] },
          { "prim": "pair", "args": [ { "prim": "bytes", "annots": [ "%nexthashedProof" ] }, { "prim": "bytes", "annots": [ "%proof" ] } ] }
        ]
      }
    ]
  },
  {
    "prim": "code",
    "args": [
      [
        { "prim": "DUP" },
        { "prim": "CDR" },
        { "prim": "SWAP" },
        { "prim": "CAR" },
        { "prim": "SWAP" },
        { "prim": "DUP" },
        { "prim": "DUG", "args": [ { "int": "2" } ] },
        { "prim": "CDR" },
        { "prim": "CAR" },
        { "prim": "SWAP" },
        { "prim": "DUP" },
        { "prim": "DUG", "args": [ { "int": "2" } ] },
        { "prim": "CDR" },
        { "prim": "CDR" },
        { "prim": "BLAKE2B" },
        { "prim": "COMPARE" },
        { "prim": "EQ" },
        {
          "prim": "IF",
          "args": [
            [ [] ],
            [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: sp.blake2b(params.proof) == self.data.hashedProof" } ] }, { "prim": "FAILWITH" } ] ]
          ]
        },
        { "prim": "SWAP" },
        { "prim": "DUP" },
        { "prim": "DUG", "args": [ { "int": "2" } ] },
        { "prim": "CAR" },
        { "prim": "SWAP" },
        { "prim": "DUP" },
        { "prim": "DUG", "args": [ { "int": "2" } ] },
        { "prim": "CAR" },
        { "prim": "PACK" },
        { "prim": "BLAKE2B" },
        { "prim": "MEM" },
        {
          "prim": "IF",
          "args": [
            [
              [
                { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: ~ (self.data.SecretStore.contains(sp.blake2b(sp.pack(params.encryptedData))))" } ] },
                { "prim": "FAILWITH" }
              ]
            ],
            [ [] ]
          ]
        },
        { "prim": "SWAP" },
        { "prim": "DUP" },
        { "prim": "DUG", "args": [ { "int": "2" } ] },
        { "prim": "DUP" },
        { "prim": "CDR" },
        { "prim": "SWAP" },
        { "prim": "CAR" },
        { "prim": "DIG", "args": [ { "int": "2" } ] },
        { "prim": "DUP" },
        { "prim": "DUG", "args": [ { "int": "3" } ] },
        { "prim": "CAR" },
        { "prim": "SOME" },
        { "prim": "DIG", "args": [ { "int": "3" } ] },
        { "prim": "DUP" },
        { "prim": "DUG", "args": [ { "int": "4" } ] },
        { "prim": "CAR" },
        { "prim": "PACK" },
        { "prim": "BLAKE2B" },
        { "prim": "UPDATE" },
        { "prim": "PAIR" },
        { "prim": "DUG", "args": [ { "int": "2" } ] },
        { "prim": "SWAP" },
        { "prim": "DROP" },
        { "prim": "SWAP" },
        { "prim": "DUP" },
        { "prim": "DUG", "args": [ { "int": "2" } ] },
        { "prim": "DUP" },
        { "prim": "CAR" },
        { "prim": "SWAP" },
        { "prim": "CDR" },
        { "prim": "CAR" },
        { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "1" } ] },
        { "prim": "DIG", "args": [ { "int": "4" } ] },
        { "prim": "DUP" },
        { "prim": "DUG", "args": [ { "int": "5" } ] },
        { "prim": "CDR" },
        { "prim": "CDR" },
        { "prim": "ADD" },
        { "prim": "SWAP" },
        { "prim": "PAIR" },
        { "prim": "SWAP" },
        { "prim": "PAIR" },
        { "prim": "DUG", "args": [ { "int": "2" } ] },
        { "prim": "SWAP" },
        { "prim": "DROP" },
        { "prim": "SWAP" },
        { "prim": "DUP" },
        { "prim": "DUG", "args": [ { "int": "2" } ] },
        { "prim": "DUP" },
        { "prim": "CAR" },
        { "prim": "SWAP" },
        { "prim": "CDR" },
        { "prim": "CDR" },
        { "prim": "DIG", "args": [ { "int": "2" } ] },
        { "prim": "DUP" },
        { "prim": "DUG", "args": [ { "int": "3" } ] },
        { "prim": "CDR" },
        { "prim": "CAR" },
        { "prim": "PAIR" },
        { "prim": "SWAP" },
        { "prim": "PAIR" },
        { "prim": "DUG", "args": [ { "int": "2" } ] },
        { "prim": "DROP", "args": [ { "int": "2" } ] },
        { "prim": "NIL", "args": [ { "prim": "operation" } ] },
        { "prim": "PAIR" }
      ]
    ]
  }
];

export function SecretStoreStorage(initialNonce: any, initialHashedProof:any) {

  const storage = { "prim": "Pair", "args": [ [], { "prim": "Pair", "args": [ { "bytes": `${initialHashedProof}` }, { "int": `${initialNonce}` } ] } ] };
  return storage;
}

export const SecretStoreMichelson = `parameter (pair (pair (string %encryptedData) (bytes %nexthashedProof)) (bytes %proof));
storage   (pair (pair (list %SecretStore string) (bytes %hashedProof)) (int %nonce));
code
{
  DUP;        # pair(params, storage).pair(params, storage)
  CDR;        # storage.pair(params, storage)
  SWAP;       # pair(params, storage).storage
  CAR;        # params.storage
  # Entry point: add_secret # params.storage
  # sp.verify(sp.blake2b(params.proof) == self.data.hashedProof) # params.storage
  SWAP;       # storage.params
  DUP;        # storage.storage.params
  DUG 2;      # storage.params.storage
  CADR;       # bytes.params.storage
  SWAP;       # params.bytes.storage
  DUP;        # params.params.bytes.storage
  DUG 2;      # params.bytes.params.storage
  CDR;        # bytes.bytes.params.storage
  BLAKE2B;    # bytes.bytes.params.storage
  COMPARE;    # int.params.storage
  EQ;         # bool.params.storage
  IF
    {}
    {
      PUSH string "WrongCondition: sp.blake2b(params.proof) == self.data.hashedProof"; # string.params.storage
      FAILWITH;   # FAILED
    }; # params.storage
  # self.data.SecretStore.push(params.encryptedData) # params.storage
  SWAP;       # storage.params
  DUP;        # storage.storage.params
  DUG 2;      # storage.params.storage
  DUP;        # storage.storage.params.storage
  CDR;        # int.storage.params.storage
  SWAP;       # storage.int.params.storage
  CADR;       # bytes.int.params.storage
  DIG 3;      # storage.bytes.int.params
  DUP;        # storage.storage.bytes.int.params
  DUG 4;      # storage.bytes.int.params.storage
  CAAR;       # list string.bytes.int.params.storage
  DIG 3;      # params.list string.bytes.int.storage
  DUP;        # params.params.list string.bytes.int.storage
  DUG 4;      # params.list string.bytes.int.params.storage
  CAAR;       # string.list string.bytes.int.params.storage
  CONS;       # list string.bytes.int.params.storage
  PAIR;       # pair (list string) bytes.int.params.storage
  PAIR;       # pair (pair (list string) bytes) int.params.storage
  DUG 2;      # params.storage.pair (pair (list string) bytes) int
  SWAP;       # storage.params.pair (pair (list string) bytes) int
  DROP;       # params.pair (pair (list string) bytes) int
  # self.data.nonce += 1 # params.pair (pair (list string) bytes) int
  SWAP;       # pair (pair (list string) bytes) int.params
  DUP;        # pair (pair (list string) bytes) int.pair (pair (list string) bytes) int.params
  DUG 2;      # pair (pair (list string) bytes) int.params.pair (pair (list string) bytes) int
  CAR;        # pair (list string) bytes.params.pair (pair (list string) bytes) int
  PUSH int 1; # int.pair (list string) bytes.params.pair (pair (list string) bytes) int
  DIG 3;      # pair (pair (list string) bytes) int.int.pair (list string) bytes.params
  DUP;        # pair (pair (list string) bytes) int.pair (pair (list string) bytes) int.int.pair (list string) bytes.params
  DUG 4;      # pair (pair (list string) bytes) int.int.pair (list string) bytes.params.pair (pair (list string) bytes) int
  CDR;        # int.int.pair (list string) bytes.params.pair (pair (list string) bytes) int
  ADD;        # int.pair (list string) bytes.params.pair (pair (list string) bytes) int
  SWAP;       # pair (list string) bytes.int.params.pair (pair (list string) bytes) int
  PAIR;       # pair (pair (list string) bytes) int.params.pair (pair (list string) bytes) int
  DUG 2;      # params.pair (pair (list string) bytes) int.pair (pair (list string) bytes) int
  SWAP;       # pair (pair (list string) bytes) int.params.pair (pair (list string) bytes) int
  DROP;       # params.pair (pair (list string) bytes) int
  # self.data.hashedProof = params.nexthashedProof # params.pair (pair (list string) bytes) int
  SWAP;       # pair (pair (list string) bytes) int.params
  DUP;        # pair (pair (list string) bytes) int.pair (pair (list string) bytes) int.params
  DUG 2;      # pair (pair (list string) bytes) int.params.pair (pair (list string) bytes) int
  DUP;        # pair (pair (list string) bytes) int.pair (pair (list string) bytes) int.params.pair (pair (list string) bytes) int
  CDR;        # int.pair (pair (list string) bytes) int.params.pair (pair (list string) bytes) int
  SWAP;       # pair (pair (list string) bytes) int.int.params.pair (pair (list string) bytes) int
  CAAR;       # list string.int.params.pair (pair (list string) bytes) int
  DIG 2;      # params.list string.int.pair (pair (list string) bytes) int
  DUP;        # params.params.list string.int.pair (pair (list string) bytes) int
  DUG 3;      # params.list string.int.params.pair (pair (list string) bytes) int
  CADR;       # bytes.list string.int.params.pair (pair (list string) bytes) int
  SWAP;       # list string.bytes.int.params.pair (pair (list string) bytes) int
  PAIR;       # pair (list string) bytes.int.params.pair (pair (list string) bytes) int
  PAIR;       # pair (pair (list string) bytes) int.params.pair (pair (list string) bytes) int
  DUG 2;      # params.pair (pair (list string) bytes) int.pair (pair (list string) bytes) int
  DROP;       # pair (pair (list string) bytes) int.pair (pair (list string) bytes) int
  DROP;       # pair (pair (list string) bytes) int
  NIL operation; # list operation.pair (pair (list string) bytes) int
  PAIR;       # pair (list operation) (pair (pair (list string) bytes) int)
} # pair (list operation) (pair (pair (list string) bytes) int);`;


export function SecretStoreStorageMichelson(initialNonce: any, initialHashedProof:any) {

  const storage = `(Pair (Pair {} ${initialHashedProof}) ${initialNonce})`;
  return storage;
}


const babylonnetCredentials = {
  publicKey: "edpkvC1Ws6wFh8P1F4x5HqnKtpXa7sYoqKAYijjo94iTxGJHMpLpFG",
  privateKey: "edskRzvvZ2CvidixAvNwbVR2S5WgMGr62HPqA7rkxKX51xeTL4dC3GGTBzQFqt5EtaeGMz2MNRVUckLKzFzMU2jRiXaBwRiNwx",
  publicKeyHash: "tz1MQxHDMNUDgBqDPZqxJJK3ucRa2aCy7XRX",
}

const carthagenetCredentials = {
  publicKey: 'edpkuH4EMzK1jZSU8836SqZKc9RxY2aCKwK2KzPhqobb6zVk5TkTvV',
  privateKey: 'edskRpMHNHjKqbJ1jZZd6oLpLC3jFujmY2nqoc7cxkBDnvhzfbc9zVc4ZZS1czBtXRPsu2A2LeU6DNwvzadQ5xDUVqun1ic4t6',
  publicKeyHash: 'tz1QCRznmbFuix8PkXwgRZ626giv4ENRshWK',
};


export const credentials = {babylonnet: babylonnetCredentials, carthagenet: carthagenetCredentials}
