import {
  DeployUtil,
  RuntimeArgs,
  CLU512,
  CLString,
  CasperServiceByJsonRPC,
  CLKey,
  CLAccountHash,
  CLPublicKey,
} from "casper-js-sdk";
import * as utils from "./utils";
import * as constants from "./constants";

const PATH_TO_PAYMENT_WASM =
  "/home/jh/caspereco/nft-market-contracts/payment/contract/target/wasm32-unknown-unknown/release/contract.wasm";
const TOKEN_CONTRACT_HASH =
  "contract-87fdeb562b07ccf18e22974edcaf3832e7e6daacd67881406cfc18ccd96eb5f0";

const MARKET_CONTRACT_HASH =
  "contract-1eca08d255ee23253f2c2db62293e080f520d671e0247548ca9982ed624a4243";
const PATH_TO_KEY = "/home/jh/casper-node/utils/nctl/assets/net-1/users/user-1";

const main = async () => {
  //Step 1: Set casper node client
  const client = new CasperServiceByJsonRPC("http://localhost:11101/rpc");

  //Step 2: Set contract operator key pair
  const keyPairofContract = utils.getKeyPairOfContract(PATH_TO_KEY);

  // source public key
  const hexString1 =
    "01e49523e49fc7ac5f30c3341ec0aa912c53483ffdbd87a955cd3c73ce2ed90d63";

  const myHash1 = new CLAccountHash(
    CLPublicKey.fromHex(hexString1).toAccountHash()
  );

  const source_key = new CLKey(myHash1);

  // target public key
  const hexString2 =
    "0108202b161d20ae53c5763d986e7b02be88265a0b44d2f73af479eaf9fb4d90e3";

  const myHash2 = new CLAccountHash(
    CLPublicKey.fromHex(hexString2).toAccountHash()
  );

  const target_key = new CLKey(myHash2);

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keyPairofContract.publicKey,
      constants.DEPLOY_CHAIN_NAME,
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      utils.getBinary(PATH_TO_PAYMENT_WASM),
      RuntimeArgs.fromMap({
        market_contract_hash: new CLString(MARKET_CONTRACT_HASH),
        entry_point_name: new CLString("buy_listing"),
        token_contract_hash: new CLString(TOKEN_CONTRACT_HASH),
        token_id: new CLString("0"),
        amount: new CLU512(101000000000),
        source_key: source_key,
        target_key: target_key,
      })
    ),
    DeployUtil.standardPayment(300000000000)
  );
  deploy = DeployUtil.signDeploy(deploy, keyPairofContract);

  //Step 5.3 Dispatch deploy to node.
  let deployHash = await client.deploy(deploy);
  console.log("deployHash", deployHash);
};

main();
