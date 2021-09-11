const auth_endpoint = 'https://accounts.spotify.com/authorize/'
const redirect_uri = 'https://sound-county.herokuapp.com/profile/'
const client_id = '8251b0380e524e5f85321c48eb19aa22'

const scopes = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "playlist-read-private",
  "user-modify-playback-state",
]

const login_url = `${auth_endpoint}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&show_dialog=true&scope=${scopes.join("%20")}`

const config = {
    GMAIL_PASSWORD: 'Weedpickle420',
    SPOTIFY_LOGIN_URL: login_url
}

export default config