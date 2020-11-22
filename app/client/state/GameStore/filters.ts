export type SpotifriendsTrackType = {
    id: string;
    artwork: string;
    title: string;
    artist: string;
    album: string;
    uri: string;
};

export const playlistTrackFilter = (
    existingTrackData: SpotifriendsTrackType[],
    newtrackData: any[]
): SpotifriendsTrackType[] => {
    return [
        ...existingTrackData,
        ...newtrackData.map((track: any) => {
            return {
                id: track.id,
                artwork: track.album.images[0].url,
                title: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            };
        }),
    ];
};

export const userSelectedTracksFilter = (
    currentUserSelectedTracks: string[],
    newUserSelectedTrack: string
): string[] => {
    if (currentUserSelectedTracks.find((track: string) => track === newUserSelectedTrack)) {
        return currentUserSelectedTracks;
    }

    return [...currentUserSelectedTracks, newUserSelectedTrack];
};
