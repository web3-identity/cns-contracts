import { TransactionReceipt } from "js-conflux-sdk/dist/types/rpc/types/formatter";
import fs from "fs";
import path from "path";

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

export function getContractMetadata(contractName: string) {
  const contractMetadata = JSON.parse(
    fs.readFileSync(
      path.join(
        process.env.PROJECT_ROOT as string,
        `./artifacts/${contractName}.json`
      ),
      "utf8"
    )
  );
  return contractMetadata;
}
