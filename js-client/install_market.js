import { DeployUtil, RuntimeArgs, CasperServiceByJsonRPC } from "casper-js-sdk";
import * as utils from "./utils";
import * as constants from "./constants";

const PATH_TO_MARKET_WASM =
  "/home/jh/caspereco/nft-market-contracts/market/contract/target/wasm32-unknown-unknown/release/contract.wasm";
const PATH_TO_KEY = "/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1";
const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(PATH_TO_KEY);

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_MARKET_WASM),
      RuntimeArgs.fromMap({})
    ),
    DeployUtil.standardPayment(3000000000000)
  );
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log("deployHash", deployHash);
};

main();
