use alloc::string::String;
use casper_types::{ContractHash, Key, U512};

pub enum MarketEvent {
    ListingCreated {
        package: ContractHash,
        seller: Key, //Key vs AccountHash so we know what we're getting client side
        token_contract: String,
        token_id: String,
        price: U512,
    },
    ListingPurchased {
        package: ContractHash,
        seller: Key,
        buyer: Key,
        token_contract: String,
        token_id: String,
        price: U512,
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
        price: U512,
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
        price: U512,
    },
}
