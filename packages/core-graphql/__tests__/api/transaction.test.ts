import "@arkecosystem/core-test-utils";
import genesisBlock from "../../../core-test-utils/src/config/testnet/genesisBlock.json";

import * as app from "../__support__/setup";
import utils from "../__support__/utils";

beforeAll(async () => {
  await app.setUp();
});

afterAll(() => {
  app.tearDown();
});

describe("GraphQL API { transaction }", () => {
  describe("GraphQL queries for Transaction", () => {
    it("should get a transaction by its id", async () => {
      const query = `{ transaction(id:"${
        genesisBlock.transactions[0].id
      }") { id } }`;
      const response = await utils.request(query);

      expect(response).toBeSuccessfulResponse();

      const data = response.data.data;
      expect(data).toBeObject();
      expect(data.transaction).toBeObject();
      expect(data.transaction.id).toBe(genesisBlock.transactions[0].id);
    });
  });
});