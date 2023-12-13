import {
  DeployUtil,
  RuntimeArgs,
  CLU512,
  CLString,
  CasperServiceByJsonRPC,
  decodeBase16,
} from "casper-js-sdk";
import * as utils from "./utils";
import * as constants from "./constants";

const TOKEN_CONTRACT_HASH =
  "contract-87fdeb562b07ccf18e22974edcaf3832e7e6daacd67881406cfc18ccd96eb5f0";

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
      decodeBase16(MARKET_CONTRACT_HASH),
      "create_listing",
      RuntimeArgs.fromMap({
        token_id: new CLString("0"),
        token_contract_hash: new CLString(TOKEN_CONTRACT_HASH),
        price: new CLU512(101000000000),
      })
    ),
    DeployUtil.standardPayment(30000000000)
  );
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log("deployHash", deployHash);
};

main();
