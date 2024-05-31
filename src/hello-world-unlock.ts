import dotenv from "dotenv";
import {
  Blockfrost,
  Constr,
  Data,
  fromHex,
  Lucid,
  OutRef,
  Redeemer,
  SpendingValidator,
  toHex,
  TxHash,
  utf8ToHex,
} from "https://deno.land/x/lucid@0.8.3/mod.ts";
import * as cbor from "https://deno.land/x/cbor@v1.4.1/index.js";

dotenv.config();

const result: dotenv.DotenvParseOutput | undefined = dotenv.config().parsed;

const lucid = await Lucid.new(
  new Blockfrost(
    "https://cardano-preview.blockfrost.io/api/v0",
    result?.BLOCKFROST_PROJECT_ID,
  ),
  "Preview",
);
if (result) {
  lucid.selectWalletFromPrivateKey(result.ADDRESS_PRIVATE_KEY);
}

const validator = await readValidator();

// --- Supporting functions

async function readValidator(): Promise<SpendingValidator> {
  const validator =
    JSON.parse(await Deno.readTextFile("hello-world/plutus.json"))
      .validators[0];
  return {
    type: "PlutusV2",
    script: toHex(cbor.encode(fromHex(validator.compiledCode))),
  };
}

const utxo: OutRef = { txHash: Deno.args[0], outputIndex: 0 };

const redeemer = Data.to(new Constr(0, [utf8ToHex("Hello, World!")]));

const txHash = await unlock(utxo, {
  from: validator,
  using: redeemer,
});

await lucid.awaitTx(txHash);

console.log(`1 tADA unlocked from the contract
    Tx ID:    ${txHash}
    Redeemer: ${redeemer}
`);

// --- Supporting functions

async function unlock(
  ref: OutRef,
  { from, using }: { from: SpendingValidator; using: Redeemer },
): Promise<TxHash> {
  const [utxo] = await lucid.utxosByOutRef([ref]);

  const tx = await lucid
    .newTx()
    .collectFrom([utxo], using)
    .addSigner(await lucid.wallet.address())
    .attachSpendingValidator(from)
    .complete();

  const signedTx = await tx
    .sign()
    .complete();

  return signedTx.submit();
}

export { unlock };
