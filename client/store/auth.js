export const state = () => ({
  isLogged: false,
  user: {},
})

export const mutations = {
  login(state, user) {
    state.isLogged = true
    state.user = user
  },
  logout(state) {
    state.isLogged = false
    state.user = {}
  },
}
