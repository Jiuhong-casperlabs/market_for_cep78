This is based on [nft-market-contracts](https://github.com/casper-ecosystem/nft-market-contracts) which is for cep47.

Since there are users asking for market for cep78 and found the above contract isn't compatible well for cep78 so this contract is created.


## STEPS

### compile market contract

```
cd market
make prepare
make build-contract
```

### compile payment contract

```
cd payment
make prepare
make build-contract
```

### js client

```
cd js-client
```
1, install cep78

2, mint token // set owner to key of account-hash-xxx

3, npm run install_market

4, npm run approve // approve market contract hash 

5, npm run create_listing 

6, npm run buy_listing