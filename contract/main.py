import smartpy as sp


class SecretStore(sp.Contract):
    def __init__(self, initialNonce, initialHashedProof):
        self.init(
            nonce=initialNonce,
            hashedProof=initialHashedProof,
            SecretStore=sp.list(t=sp.TString),
            )

    @sp.entry_point
    def add_secret(self, params):
        # make sure proof checks out
        sp.verify(sp.blake2b(params.proof) == self.data.hashedProof)
        # add secret to user SecretStore
        self.data.SecretStore.push(params.encryptedData)
        # increment nonce
        self.data.nonce = self.data.nonce + 1
        # set new hashedSecret
        self.data.hashedProof = params.nexthashedProof