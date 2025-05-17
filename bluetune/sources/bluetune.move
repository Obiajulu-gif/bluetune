module bluetune::bluetune;

use sui::{
    balance::{Self, Balance},
    clock::Clock,
    coin::{Self,Coin},
    event,
    package::{Self, Publisher},
    vec_map::{Self, VecMap},
};
use std::string::String;

const ENotAuthorized: u64 = 0;
// const EMusicAlreadyExists: u64 = 1;
// const EMusicNotFound: u64 = 2;
const EInvalidCoin: u64 = 3;

public struct BLUETUNE has drop{}

public struct Track has key, store{
    id: UID,
    metadata: TrackMetadata,
}

public struct TrackMetadata has copy, store, drop{
    id: ID,
    title: String,
    artist: String,
    coverUrl: String,
    genre: String,
    duration: u64,
    blobId: String,
    blobObjectId: address,
    dateAdded: u64,
}

public struct BlueTune<phantom WAL> has key {
    id: UID,
    tracks: VecMap<String, TrackMetadata>,
    payments: Balance<WAL>,
}

public struct MusicAddedEvent has copy, drop {
    id: ID,
    metadata: TrackMetadata,
}

fun init(otw: BLUETUNE, ctx: &mut TxContext) {
    let publisher : Publisher = package::claim(otw, ctx);
    transfer::public_transfer(publisher, ctx.sender());
}

public fun create_bluetune<WAL>(cap: &Publisher, ctx: &mut TxContext) {
    assert!(cap.from_module<BlueTune<WAL>>(), ENotAuthorized);
    let bluetune = BlueTune{
        id: object::new(ctx),
        tracks: vec_map::empty<String, TrackMetadata>(),
        payments: balance::zero<WAL>(),
    };
    transfer::share_object(bluetune);
}

#[allow(lint(self_transfer))]
public fun add_track<WAL>(bluetune: &mut BlueTune<WAL>, payment_coin: Coin<WAL>, title: String, artist: String, coverUrl: String, genre: String, duration: u64, blobId: String, blobObjectId: address, clock: &Clock, ctx: &mut TxContext) {
    // assert!(!bluetune.music.contains(blobId), EMusicAlreadyExists);
    let id = object::new(ctx);
    assert!(payment_coin.value() > 0, EInvalidCoin);
    let metadata = TrackMetadata{
        id: *id.as_inner(),
        title,
        artist,
        coverUrl,
        genre,
        duration,
        blobId,
        blobObjectId,
        dateAdded: clock.timestamp_ms(),
    };
    let track = Track{
        id,
        metadata,
        
    };
    bluetune.tracks.insert(blobId, metadata);
    coin::put(&mut bluetune.payments, payment_coin);
    event::emit(MusicAddedEvent{
        id: *track.id.as_inner(),
        metadata,
    });
    transfer::public_transfer(track, ctx.sender());
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
