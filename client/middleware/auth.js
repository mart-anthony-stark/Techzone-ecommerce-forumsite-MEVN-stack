export default async ({ store }) => {
  const token = localStorage.getItem('token')
  if (token) {
    const res = await fetch(`${process.env.baseUrl}/auth/logged`)
    const data = await res.json()
    console.log(data)
    if (res.status === 200) {
      store.commit('auth/login', data.user)
      return
    }
  }
  store.commit('auth/logout')
}
