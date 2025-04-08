module bluetune::bluetune;

use sui::{
    balance::{Self, Balance},
    clock::Clock,
    coin::{Self,Coin},
    event,
    // table::{Self, Table},
    package::{Self, Publisher},
};
use std::string::String;

const ENotAuthorized: u64 = 0;
// const EMusicAlreadyExists: u64 = 1;
// const EMusicNotFound: u64 = 2;
const EInvalidCoin: u64 = 3;

public struct BLUETUNE has drop{}

// public enum Genre has copy, drop, store {
//     Pop,
//     Rock,
//     Jazz,
//     Classical,
//     HipHop,
//     Electronic,
//     Country,
//     Reggae,
//     Blues,
//     RnB,
// }

public struct Music has key, store{
    id: UID,
    title: String,
    artist: String,
    album: String,
    coverUrl: String,
    genre: String,
    duration: u64,
    blobId: String,
    plays: u64,
    dateAdded: u64,
}

public struct BlueTune<phantom WAL> has key {
    id: UID,
    music: vector<Music>,
    payments: Balance<WAL>,
}

public struct MusicAddedEvent has copy, drop {
    id: ID,
    title: String,
    artist: String,
    album: String,
    coverUrl: String,
    genre: String,
    duration: u64,
    blobId: String,
    dateAdded: u64,
    plays: u64,
}

fun init(otw: BLUETUNE, ctx: &mut TxContext) {
    let publisher : Publisher = package::claim(otw, ctx);
    transfer::public_transfer(publisher, ctx.sender());
}

public fun create_bluetune<WAL>(cap: &Publisher, ctx: &mut TxContext) {
    assert!(cap.from_module<BlueTune<WAL>>(), ENotAuthorized);
    let bluetune = BlueTune{
        id: object::new(ctx),
        music: vector::empty<Music>(),
        payments: balance::zero<WAL>(),
    };
    transfer::share_object(bluetune);
}

public fun add_music<WAL>(bluetune: &mut BlueTune<WAL>, payment_coin: Coin<WAL>, title: String, artist: String, album: String, coverUrl: String, genre: String, duration: u64, blobId: String, plays: u64, clock: &Clock, ctx: &mut TxContext) {
    // assert!(!bluetune.music.contains(blobId), EMusicAlreadyExists);
    assert!(payment_coin.value() > 0, EInvalidCoin);
    let music = Music{
        id: object::new(ctx),
        title,
        artist,
        album,
        coverUrl,
        genre,
        duration,
        blobId,
        dateAdded: clock.timestamp_ms(),
        plays,
    };
    coin::put(&mut bluetune.payments, payment_coin);
    event::emit(MusicAddedEvent{
        id: music.id.to_inner(),
        title,
        artist,
        album,
        coverUrl,
        genre,
        duration,
        blobId,
        dateAdded: clock.timestamp_ms(),
        plays,
    });
    bluetune.music.push_back(music);
}

// public fun get_music<WAL>(bluetune: &BlueTune<WAL>, blobId: String): &Music {
//     // assert!(bluetune.music.contains(blobId), EMusicNotFound);
//     // bluetune.music.borrow(blobId)
//     let mut i = 0;
//     while (i < bluetune.music.length()) {
//         let music = bluetune.music.borrow(i);
//         if (music.blobId == blobId) {
//             return music
//         };
//         i = i + 1;
//     };
    
// }

// public fun update_plays<WAL>(bluetune: &mut BlueTune<WAL>, blobId: String, plays: u64) {
//     let music = bluetune.music.borrow_mut(blobId);
//     music.plays = plays;
//     music.plays = music.plays + 1;
// }
