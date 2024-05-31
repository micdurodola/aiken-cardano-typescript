import { Lucid } from "lucid-cardano";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";

Deno.test("Test Lucid address generation", async () => {
  const lucid = await Lucid.new(undefined, "Preview");

  const privateKey = lucid.utils.generatePrivateKey();
  await Deno.writeTextFile("test.sk", privateKey);

  const address = await lucid
    .selectWalletFromPrivateKey(privateKey)
    .wallet.address();
  await Deno.writeTextFile("test.addr", address);

  const savedPrivateKey = await Deno.readTextFile("test.sk");
  const savedAddress = await Deno.readTextFile("test.addr");

  // Verify that the generated and saved private key matches
  assertEquals(privateKey, savedPrivateKey);

  // Verify that the address is correctly generated and saved
  assert(savedAddress.length > 0, "Address should not be empty");

  // Clean up
  await Deno.remove("test.sk");
  await Deno.remove("test.addr");
});
