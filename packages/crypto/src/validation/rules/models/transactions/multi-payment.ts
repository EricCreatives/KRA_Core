import { TRANSACTION_TYPES } from "../../../../constants"
import { Engine } from "../../../engine"

export const multiPayment = transaction => {
  const { error, value } = Engine.validate(
    transaction,
    Engine.joi.object({
      id: Engine.joi
        .string()
        .alphanum()
        .required(),
      blockid: Engine.joi
        .alternatives()
        .try(Engine.joi.arkBlockId(), Engine.joi.number().unsafe()),
      type: Engine.joi.number().valid(TRANSACTION_TYPES.MULTI_PAYMENT),
      timestamp: Engine.joi
        .number()
        .integer()
        .min(0)
        .required(),
      amount: Engine.joi.alternatives().try(
        Engine.joi.bignumber(),
        Engine.joi
          .number()
          .integer()
          .min(0)
          .required()
      ),
      fee: Engine.joi.alternatives().try(
        Engine.joi.bignumber(),
        Engine.joi
          .number()
          .integer()
          .min(0)
          .required()
      ),
      senderId: Engine.joi.arkAddress(),
      senderPublicKey: Engine.joi.arkPublicKey().required(),
      signature: Engine.joi
        .string()
        .alphanum()
        .required(),
      signatures: Engine.joi.array(),
      secondSignature: Engine.joi.string().alphanum(),
      asset: Engine.joi.object().required(),
      confirmations: Engine.joi
        .number()
        .integer()
        .min(0)
    }),
    {
      allowUnknown: true
    }
  );

  return {
    data: value,
    errors: error ? error.details : null,
    passes: !error,
    fails: error
  };
};
