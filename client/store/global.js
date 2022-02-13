export const state = () => ({
  showChatbox: false,
  showMobileNav: false,
  checkingAuth: true,
})

export const mutations = {
  toggleNav(state) {
    state.showMobileNav = !state.showMobileNav
  },
  toggle(state) {
    state.showChatbox = !state.showChatbox
  },
  close(state) {
    state.showChatbox = false
  },
  toggleCheckingAuth(state) {
    state.checkingAuth = !state.checkingAuth
  },
}
