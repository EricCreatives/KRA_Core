jest.mock("@arkecosystem/core-container", () => {
  return {
    app: {
      resolvePlugin: (name) => {
        if (name === "config") {
          return {
            getConstants: () => ({
              height: 1,
              reward: 2 * 1e8,
            }),
            genesisBlock: {
              totalAmount: 1000000 * 1e8,
            },
          };
        }

        return {};
      },
    },
  };
});