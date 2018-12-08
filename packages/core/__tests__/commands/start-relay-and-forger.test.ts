import "jest-extended";
import delay from "delay";
import { startRelayAndForger } from "../../src/commands";
import { opts, version } from "../__support__/app";

jest.setTimeout(60000);

describe("Commands - Start Relay & Forger", () => {
  it("should be a function", () => {
    expect(startRelayAndForger).toBeFunction();
  });

  it("should be OK", async () => {
    const app = await startRelayAndForger(opts, version);

    expect(app.isReady).toBeTrue();

    await app.tearDown();

    expect(app.isReady).toBeFalse();

    await delay(3000);
  });
});
