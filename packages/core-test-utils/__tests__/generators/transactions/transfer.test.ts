import { Bignum, constants } from "../../../../crypto";
import { generateTransfers } from "../../../src/generators";

const { TRANSACTION_TYPES, ARKTOSHI } = constants;

describe("Transfer transaction", () => {
  it("should be a function", () => {
    expect(generateTransfers).toBeFunction();
  });

  const amount = new (Bignum as any)(20 * ARKTOSHI);
  const quantity = 4;
  const transactions = generateTransfers(
    undefined,
    undefined,
    undefined,
    amount,
    quantity
  );

  it("should return an array", () => {
    expect(transactions).toBeArrayOfSize(quantity);
  });

  it("should return an array of 4 transfer objects", () => {
    for (const transaction of transactions) {
      expect(transaction).toMatchObject({
        type: TRANSACTION_TYPES.TRANSFER
      });
    }
  });

  it("should return an array sending 20 ark", () => {
    for (const transaction of transactions) {
      expect(transaction).toMatchObject({ amount });
    }
  });
});
