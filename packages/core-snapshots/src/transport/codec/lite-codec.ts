import msgpack from "msgpack-lite";
import * as liteEncoder from "./lite";

class LiteCodec {
  get blocks() {
    const codec = msgpack.createCodec();
    codec.addExtPacker(0x3f, Object, liteEncoder.blockEncode);
    codec.addExtUnpacker(0x3f, liteEncoder.blockDecode);

    return codec;
  }

  get transactions() {
    const codec = msgpack.createCodec();
    codec.addExtPacker(0x4f, Object, liteEncoder.transactionEncode);
    codec.addExtUnpacker(0x4f, liteEncoder.transactionDecode);

    return codec;
  }
}

export default new LiteCodec();
