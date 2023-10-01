const SONG_VISIBILITIES={
PUBLIC:"public",
PRIVATE:"private",
UNLISTED:"unlisted",
}



const SONG_STATUS={
    PENDING:"pending",
    PROCESSED:"processed",
    PUBLISHED:"published",
}

module.exports ={
    SONG_STATUS:Object.freeze(SONG_STATUS),
    SONG_VISIBILITIES:Object.freeze(SONG_VISIBILITIES)
}
