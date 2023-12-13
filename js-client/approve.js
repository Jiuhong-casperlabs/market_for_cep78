import {
  DeployUtil,
  RuntimeArgs,
  CLKey,
  CasperServiceByJsonRPC,
  decodeBase16,
  CLByteArray,
  CLU64,
} from "casper-js-sdk";
import * as utils from "./utils";
import * as constants from "./constants";

const TOKEN_CONTRACT_HASH =
  "87fdeb562b07ccf18e22974edcaf3832e7e6daacd67881406cfc18ccd96eb5f0";

// MARKET_CONTRACT_HASH
const MARKET_CONTRACT_HASH =
  "1eca08d255ee23253f2c2db62293e080f520d671e0247548ca9982ed624a4243";
const PATH_TO_KEY = "/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(PATH_TO_KEY);

  //Step 5.1 Set deploy

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      decodeBase16(TOKEN_CONTRACT_HASH),
      "approve",
      RuntimeArgs.fromMap({
        token_id: new CLU64("0"),
        spender: new CLKey(new CLByteArray(decodeBase16(MARKET_CONTRACT_HASH))),
      })
    ),
    DeployUtil.standardPayment(
      constants.DEPLOY_GAS_PAYMENT_FOR_SESSION_TRANSFER
    )
  );
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log("deployHash", deployHash);
};

main();
