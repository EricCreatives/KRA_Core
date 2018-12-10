import "jest-extended";

import { VoteHandler } from "../../../src/handlers/transactions/vote";
import { Bignum } from "../../../src/utils/bignum";

const handler = new VoteHandler();

let wallet;
let transaction;

beforeEach(() => {
    wallet = {
        address: "DQ7VAW7u171hwDW75R1BqfHbA9yiKRCBSh",
        balance: new Bignum("6453530000000"),
        publicKey: "0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0",
        vote: null,
    };

    transaction = {
        version: 1,
        id: "44d6f5ac5fbb6104ee250f6b5cb43401961114263499fd067922f3e2a9cb9d24",
        blockid: "5273958469976113749",
        type: 3,
        timestamp: 36345270,
        amount: Bignum.ZERO,
        fee: new Bignum(100000000),
        senderId: "DQ7VAW7u171hwDW75R1BqfHbA9yiKRCBSh",
        recipientId: "DQ7VAW7u171hwDW75R1BqfHbA9yiKRCBSh",
        senderPublicKey: "0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0",
        signature:
            "304402204da11f2677ea67ad3718520020eb2e2d43b5c83f947490d2b454ce3ec0f1dcba022011a00e3c3febdaf531a404d728b111812647c2f0e33df439c7cbae01dcb702ba",
        asset: {
            votes: ["+0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0"],
        },
        confirmations: 19771,
    };
});

describe("VoteHandler", () => {
    it("should be instantiated", () => {
        expect(handler.constructor.name).toBe("VoteHandler");
    });

    describe("canApply", () => {
        it("should be a function", () => {
            expect(handler.canApply).toBeFunction();
        });
        it("should be false if wallet has already voted", () => {
            wallet.vote = "0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0";
            const errors = [];

            expect(handler.canApply(wallet, transaction, errors)).toBeFalse();
            expect(errors).toContain("Wallet has already voted");
        });
        it("should be false if tx vote-choice does not match wallet vote-choice", () => {
            wallet.vote = "a310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0";
            transaction.asset.votes[0] = "-0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0";
            const errors = [];

            expect(handler.canApply(wallet, transaction, errors)).toBeFalse();
            expect(errors).toContain("Wallet vote-choice does not match transaction vote-choice");
        });
        it("should be false if unvoting a non-voted wallet", () => {
            transaction.asset.votes[0] = "-0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0";
            const errors = [];

            expect(handler.canApply(wallet, transaction, errors)).toBeFalse();
            expect(errors).toContain("Wallet has not voted yet");
        });
    });

    describe("apply", () => {
        it("should be a function", () => {
            expect(handler.apply).toBeFunction();
        });

        it("should be ok", () => {
            expect(wallet.vote).toBeNull();

            handler.apply(wallet, transaction);

            expect(wallet.vote).not.toBeNull();
        });

        it("should not be ok", () => {
            wallet.vote = "0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0";

            expect(wallet.vote).not.toBeNull();

            handler.apply(wallet, transaction);

            expect(wallet.vote).not.toBeNull();
        });
    });

    describe("revert", () => {
        it("should be a function", () => {
            expect(handler.revert).toBeFunction();
        });

        it("should be ok", () => {
            wallet.vote = "0310ad026647eed112d1a46145eed58b8c19c67c505a67f1199361a511ce7860c0";

            expect(wallet.vote).not.toBeNull();

            handler.revert(wallet, transaction);

            expect(wallet.vote).toBeNull();
        });
    });
});
