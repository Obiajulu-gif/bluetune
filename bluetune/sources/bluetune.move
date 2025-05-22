module bluetune::bluetune;

use bluetune::utils;

use sui::{
    balance::{Self, Balance},
    clock::Clock,
    coin::{Self,Coin},
    event,
    package::{Self, Publisher},
    vec_map::{Self, VecMap},
};
use std::string::String;
use std::vector::push_back;

const ENotAuthorized: u64 = 0;
const ETrackAlreadyExists: u64 = 0;
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
    creatorAddress: address,
    creatorId: ID,
    downloads: u64,
    dateAdded: u64,
}

public struct Creator<phantom WAL> has key, store{
    id: UID,
    balance: Balance<WAL>,
    songs: VecMap<String, TrackMetadata>,
    addr: address
}

public struct BlueTune<phantom WAL> has key {
    id: UID,
    tracks: VecMap<String, TrackMetadata>,
    creators: vector<address>,
    payments: Balance<WAL>,
    upload_fee: u64,
    playlist_fee: u64,
    download_fee: u64,
    creator_percentage: u16
}

public struct MusicAddedEvent has copy, drop {
    id: ID,
    metadata: TrackMetadata,
}

public struct Playlist has key, store {
    id: UID,
    creator: address,
    name: String,
    description: String,
    tracks: vector<ID>,
    ispublic: bool,
    created_at: u64,
} 

public struct PlaylistCreatedEvent has copy, drop {
    id: ID,
    creator: address,
    name: String,
    description: String,
    is_public: bool,
    created_at: u64,
}

public struct DownloadEvent has copy, drop {
    creator: address,
    track_id: ID,
    downloads: u64
}

public struct SongAddedToPlaylistEvent has copy, drop {
    playlist_id: ID,
    track_id: ID,
    adder: address,
    playlist_creator: address
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
        creators: vector::empty<address>(),
        payments: balance::zero<WAL>(),
        upload_fee: 1000000000,
        playlist_fee: 100000000,
        download_fee: 100000000,
        creator_percentage: 10000
    };
    transfer::share_object(bluetune);
}

#[allow(lint(self_transfer))]
public fun beceome_creator<WAL>(bluetune: &mut BlueTune<WAL>, ctx: &mut TxContext) {
    let creator = Creator{
        id: object::new(ctx),
        balance: balance::zero<WAL>(),
        songs: vec_map::empty<String, TrackMetadata>(),
        addr: ctx.sender(),
    };
    if (!bluetune.creators.contains(&ctx.sender())) {
        bluetune.creators.push_back(ctx.sender());
    };
    transfer::public_transfer(creator, ctx.sender());
}

#[allow(lint(self_transfer))]
public fun add_track<WAL>(bluetune: &mut BlueTune<WAL>, creator: &mut Creator<WAL>, payment_coin: Coin<WAL>, title: String, artist: String, coverUrl: String, genre: String, duration: u64, blobId: String, blobObjectId: address, clock: &Clock, ctx: &mut TxContext) {
    let id = object::new(ctx);
    assert!(payment_coin.value() > 0, EInvalidCoin);
    assert!(payment_coin.value() == bluetune.upload_fee, EInvalidCoin);
    let metadata = TrackMetadata{
        id: *id.as_inner(),
        title,
        artist,
        coverUrl,
        genre,
        duration,
        blobId,
        blobObjectId,
        creatorAddress: ctx.sender(),
        creatorId: *creator.id.as_inner(),
        downloads: 0,
        dateAdded: clock.timestamp_ms(),
    };
    creator.songs.insert(blobId, metadata);
    
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

#[allow(lint(self_transfer))]
public fun create_playlist<WAL>(bluetune: &mut BlueTune<WAL>,name: String, description: String, payment_coin: Coin<WAL>, is_public: bool, clock: &Clock, ctx: &mut TxContext){
    assert!(payment_coin.value() > 0, EInvalidCoin);
    assert!(payment_coin.value() == bluetune.playlist_fee, EInvalidCoin);
    let playlist = Playlist {
        id: object::new(ctx),
        creator: ctx.sender(),
        name,
        description,
        tracks: vector::empty<ID>(),
        ispublic: is_public,
        created_at: clock.timestamp_ms(),
    };
    coin::put(&mut bluetune.payments, payment_coin);
    event::emit(PlaylistCreatedEvent {
        id: *playlist.id.as_inner(),
        creator: ctx.sender(),
        name: playlist.name,
        description: playlist.description,
        is_public,
        created_at: playlist.created_at,
    });
    if (is_public) {
        transfer::share_object(playlist);
    }else{
        transfer::public_transfer(playlist, ctx.sender());
    };
}

public fun add_track_to_playlist(playlist: &mut Playlist, track_id: ID, ctx: &mut TxContext) {
    assert!(!playlist.tracks.contains(&track_id), ETrackAlreadyExists);
    assert!(playlist.creator == ctx.sender() || playlist.ispublic, ENotAuthorized);
    playlist.tracks.push_back(track_id);

    event::emit(SongAddedToPlaylistEvent{
        playlist_id: *playlist.id.as_inner(),
        track_id,
        adder: ctx.sender(),
        playlist_creator: playlist.creator
    })
}

public fun remove_track_from_playlist(playlist: &mut Playlist, track_id: ID) {
    assert!(playlist.tracks.contains(&track_id), ETrackAlreadyExists);
    let mut i = 0;
    while (i < playlist.tracks.length()) {
        if (playlist.tracks.borrow(i) == track_id) {
            playlist.tracks.remove(i);
            break
        };
        i = i + 1;
    }
}

public fun get_tracks<WAL>(bluetune: &BlueTune<WAL>) : (vector<String>, vector<TrackMetadata>) {
    bluetune.tracks.into_keys_values()
}

public fun set_fees<WAL>(bluetune: &mut BlueTune<WAL>, upload_fee: u64, playlist_fee: u64, download_fee: u64, creator_percentage: u16) {
    bluetune.upload_fee = upload_fee;
    bluetune.playlist_fee = playlist_fee;
    bluetune.download_fee = download_fee;
    bluetune.creator_percentage = creator_percentage;
}

public fun download_track<WAL>(bluetune: &mut BlueTune<WAL>, creator: &mut Creator<WAL>, track: &mut Track, mut payment_coin: Coin<WAL>,ctx: &mut TxContext) {
    assert!(payment_coin.value() > 0, EInvalidCoin);
    assert!(payment_coin.value() == bluetune.download_fee, EInvalidCoin);
    track.metadata.downloads = track.metadata.downloads + 1;
    let bluetune_communission = utils::get_percent(track.metadata.downloads, bluetune.creator_percentage as u64, 3);
    let bluetune_communission_coin = payment_coin.split(bluetune_communission, ctx);
    coin::put(&mut bluetune.payments, bluetune_communission_coin);
    coin::put(&mut creator.balance, payment_coin);

    event::emit(DownloadEvent{
        creator: creator.addr,
        track_id: *track.id.as_inner(),
        downloads: track.metadata.downloads
    })
}

#[allow(lint(self_transfer))]
public fun withdraw_creator_balance<WAL>(creator: &mut Creator<WAL>, ctx: &mut TxContext) {
    assert!(creator.addr == ctx.sender(), ENotAuthorized);
    let creator_bal = creator.balance.withdraw_all();
    let creator_coin = creator_bal.into_coin(ctx);
    transfer::public_transfer(creator_coin, ctx.sender());
}

#[allow(lint(self_transfer))]
public fun withdraw_bluetune_balance<WAL>(bluetune: &mut BlueTune<WAL>, cap : &Publisher, ctx: &mut TxContext) {
    assert!(cap.from_module<BlueTune<WAL>>(), ENotAuthorized);
    let bluetune_bal = bluetune.payments.withdraw_all();
    let bluetune_coin = bluetune_bal.into_coin(ctx);
    transfer::public_transfer(bluetune_coin, ctx.sender());
}
