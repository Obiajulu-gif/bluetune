module bluetune::Playlist;

use sui::{
    clock::Clock, 
    event,
};
use std::string::String;

const ETrackAlreadyExists: u64 = 0;

public struct Playlist has key, store {
    id: UID,
    creator: address,
    name: String,
    description: String,
    tracks: vector<ID>,
    created_at: u64,
}

public struct PlaylistCreatedEvent has copy, drop {
    id: ID,
    creator: address,
    name: String,
    description: String,
    created_at: u64,
}

#[allow(lint(self_transfer))]
public fun create_playlist(name: String, description: String, clock: &Clock, ctx: &mut TxContext){
    let playlist = Playlist {
        id: object::new(ctx),
        creator: ctx.sender(),
        name,
        description,
        tracks: vector::empty<ID>(),
        created_at: clock.timestamp_ms(),
    };
    event::emit(PlaylistCreatedEvent {
        id: *playlist.id.as_inner(),
        creator: ctx.sender(),
        name: playlist.name,
        description: playlist.description,
        created_at: playlist.created_at,
    });
    transfer::public_transfer(playlist, ctx.sender());
}

public fun add_track_to_playlist(playlist: &mut Playlist, track_id: ID) {
    assert!(!playlist.tracks.contains(&track_id), ETrackAlreadyExists);
    playlist.tracks.push_back(track_id);
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

