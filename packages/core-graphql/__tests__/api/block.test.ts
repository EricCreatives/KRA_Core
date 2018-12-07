import "@arkecosystem/core-test-utils/lib/matchers";

import * as app from "../__support__/setup";
import utils from "../__support__/utils";

let genesisBlock;

beforeAll(async () => {
  await app.setUp();

  genesisBlock = require("@arkecosystem/core-test-utils/config/testnet/genesisBlock.json");
});

afterAll(() => {
  app.tearDown();
});

describe("GraphQL API { block }", () => {
  describe("GraphQL queries for Block", () => {
    it("should get a block by its id", async () => {
      const query = `{ block(id:"${genesisBlock.id}") { id } }`;
      const response = await utils.request(query);

      expect(response).toBeSuccessfulResponse();

      const data = response.data.data;
      expect(data).toBeObject();
      expect(data.block).toBeObject();
      expect(data.block.id).toBe(genesisBlock.id);
    });
  });
});
