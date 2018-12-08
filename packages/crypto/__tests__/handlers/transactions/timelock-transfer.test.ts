import "jest-extended";
import handler from "../../../src/handlers/transactions/timelock-transfer";
import originalWallet from "./__fixtures__/wallet";
import originalTransaction from "./__fixtures__/transaction";

let wallet;
let transaction;

beforeEach(() => {
  wallet = originalWallet;
  transaction = originalTransaction;
});

describe("TimelockTransferHandler", () => {
  it("should be instantiated", () => {
    expect(handler.constructor.name).toBe("TimelockTransferHandler");
  });

  describe("canApply", () => {
    it("should be a function", () => {
      expect(handler.canApply).toBeFunction();
    });

    it("should be true", () => {
      expect(handler.canApply(wallet, transaction, [])).toBeTrue();
    });

    it("should be false", () => {
      transaction.senderPublicKey = "a".repeat(66);

      expect(handler.canApply(wallet, transaction, [])).toBeFalse();
    });
  });

  describe("apply", () => {
    it("should be a function", () => {
      expect(handler.apply).toBeFunction();
    });
  });

  describe("revert", () => {
    it("should be a function", () => {
      expect(handler.revert).toBeFunction();
    });
  });
});