import { TransactionReceipt } from "js-conflux-sdk/dist/types/rpc/types/formatter"

export function logReceipt(receipt: TransactionReceipt, name?: string) {
  if (name) {
    console.log(`Receipt ${name} =============`);
  }
  if (receipt.outcomeStatus == 0) {
    console.log("Transaction succeeded:", receipt.transactionHash);
    if (receipt.contractCreated) {
      console.log("Contract created at:", receipt.contractCreated);
    }
  } else {
    // @ts-ignore
    console.log("Transaction failed:", receipt.txExecErrorMsg);
  }
}

export const WEB3_NAMEHASH = '0x587d09fe5fa45354680537d38145a28b772971e0f293af3ee0c536fc919710fb';