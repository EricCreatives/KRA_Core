import { app } from "@arkecosystem/core-container";

const logger = app.resolvePlugin("logger");
const snapshotManager = app.resolvePlugin("snapshots");

export async function rollbackSnapshot(options) {
    if (options.blockHeight === -1) {
        logger.warn("Rollback height is not specified. Rolling back to last completed round.");
    }
    logger.info(
        `Starting the process of blockchain rollback to block height of ${options.blockHeight.toLocaleString()}`,
    );

    await snapshotManager.rollbackChain(options.blockHeight);
}
