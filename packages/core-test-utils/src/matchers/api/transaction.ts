import * as _ from "lodash";

export {};

declare global {
    namespace jest {
        // tslint:disable-next-line:interface-name
        interface Matchers<R> {
            toBeApiTransaction(): R;
        }
    }
}

expect.extend({
    toBeApiTransaction: (actual, expected) => {
        // TODO based on type
        const allowedKeys = _.sortBy([
            "id",
            "blockid",
            "type",
            "timestamp",
            "amount",
            "fee",
            "senderId",
            "senderPublicKey",
            "signature",
            "asset",
            "confirmations",
        ]);
        const actualKeys = Object.keys(actual).filter(key => allowedKeys.includes(key));

        return {
            message: () => `Expected ${JSON.stringify(actual)} to be a valid transaction`,
            pass: _.isEqual(_.sortBy(actualKeys), allowedKeys),
        };
    },
});
