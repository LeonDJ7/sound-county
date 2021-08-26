export const refresh_access_token = async () => {

    let refresh_token = window.localStorage.getItem('refresh_token')
    if (!refresh_token) { console.log('couldnt find refresh token in localStorage'); return; }

    await fetch(`http://localhost:4000/auth/refresh_access_token?refresh_token=${refresh_token}`)
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