export const refresh_access_token = async () => {

    let refresh_token = window.localStorage.getItem('refresh_token')
    if (!refresh_token) { console.log('couldnt find refresh token in localStorage'); return; }

    await fetch(`/auth/refresh_access_token?refresh_token=${refresh_token}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            window.localStorage.setItem('access_token', data.access_token)
        })
        .catch((err: any) => {
            console.log(err)
        })

    return
}

export const get_feature_data = async (songs: any[]) => {

    if (!songs) return

    let access_token = window.localStorage.getItem('access_token')
    let res = await fetch(`/api/average_audio_features?access_token=${access_token}&songs=${songs[0].track ? songs.map((song: any) => song.track.id) : songs.map((song: any) => song.id)}`)
    let data = await res.json()
    return data

}