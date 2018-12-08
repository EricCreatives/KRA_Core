import "jest-extended";
import Bignum from "../../src/utils/bignum";
import Wallet from "../../src/models/wallet";
import multiTx from "./fixtures/multi-transaction";
import { ARKTOSHI } from "../../src/constants";
import configManager from "../../src/managers/config";
import network from "../../src/networks/ark/devnet.json";

describe("Models - Wallet", () => {
  beforeEach(() => configManager.setConfig(network));

  describe("toString", () => {
    // TODO implementation is right?
    it("returns the address and the balance", () => {
      const address = "Abcde";
      const wallet = new Wallet(address);
      const balance = parseInt((Math.random() * 1000).toFixed(8));
      wallet.balance = new Bignum(balance * ARKTOSHI);
      expect(wallet.toString()).toBe(
        `${address} (${balance} ${configManager.config.client.symbol})`
      );
    });
  });

  describe("apply transaction", () => {
    const testWallet = new Wallet("D61xc3yoBQDitwjqUspMPx1ooET6r1XLt7");
    const data = {
      publicKey:
        "02337316a26d8d49ec27059bd0589c49ba474029c3627715380f4df83fb431aece",
      secondPublicKey:
        "020d3c837d0a47ee7de1082cd48885003c5e92964e58bb34af3b58c6e42208ae03",
      balance: new Bignum(109390000000),
      vote: null,
      username: null,
      voteBalance: Bignum.ZERO,
      multisignature: null,
      dirty: false,
      producedBlocks: 0,
      missedBlocks: 0
    };

    it.skip("should be ok for a multi-transaction", () => {
      Object.keys(data).forEach(k => {
        testWallet[k] = data[k];
      });
      expect(testWallet.canApply(multiTx, [])).toBeTrue();
    });
  });

  describe("apply block", () => {
    let testWallet;
    let block;

    beforeEach(() => {
      testWallet = new Wallet("D61xc3yoBQDitwjqUspMPx1ooET6r1XLt7");
      testWallet.publicKey =
        "02337316a26d8d49ec27059bd0589c49ba474029c3627715380f4df83fb431aece";
      testWallet.balance = Bignum.ZERO;
      testWallet.producedBlocks = 0;
      testWallet.forgedFees = Bignum.ZERO;
      testWallet.forgedRewards = Bignum.ZERO;
      testWallet.lastBlock = null;

      block = {
        id: 1,
        generatorPublicKey: testWallet.publicKey,
        reward: new Bignum(1000000000),
        totalFee: new Bignum(1000000000)
      };
    });

    it("should apply correct block", () => {
      testWallet.applyBlock(block);
      expect(testWallet.balance).toEqual(block.reward.plus(block.totalFee));
      expect(testWallet.producedBlocks).toBe(1);
      expect(testWallet.forgedFees).toEqual(block.totalFee);
      expect(testWallet.forgedRewards).toEqual(block.totalFee);
      expect(testWallet.lastBlock).toBeObject();
      expect(testWallet.dirty).toBeTrue();
    });

    it("should not apply incorrect block", () => {
      block.generatorPublicKey = ("a" as any).repeat(66);
      const originalWallet = Object.assign({}, testWallet);
      testWallet.applyBlock(block);
      expect(testWallet.balance).toEqual(originalWallet.balance);
      expect(testWallet.producedBlocks).toBe(0);
      expect(testWallet.forgedFees).toEqual(originalWallet.forgedFees);
      expect(testWallet.forgedRewards).toEqual(originalWallet.forgedRewards);
      expect(testWallet.lastBlock).toBe(originalWallet.lastBlock);
      expect(testWallet.dirty).toBeTrue();
    });
  });
});