use alloc::string::String;
use casper_types::{ContractHash, Key, U256};

pub enum MarketEvent {
    ListingCreated {
        package: ContractHash,
        seller: Key, //Key vs AccountHash so we know what we're getting client side
        token_contract: String,
        token_id: String,
        price: U256,
    },
    ListingPurchased {
        package: ContractHash,
        seller: Key,
        buyer: Key,
        token_contract: String,
        token_id: String,
        price: U256,
    },
    ListingCanceled {
        package: ContractHash,
        token_contract: String,
        token_id: String,
    },
    OfferCreated {
        package: ContractHash,
        buyer: Key,
        token_contract: String,
        token_id: String,
        price: U256,
    },
    OfferWithdraw {
        package: ContractHash,
        buyer: Key,
        token_contract: String,
        token_id: String,
    },
    OfferAccepted {
        package: ContractHash,
        seller: Key,
        buyer: Key,
        token_contract: String,
        token_id: String,
        price: U256,
    },
}
