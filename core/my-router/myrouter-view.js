// h函数返回component vdom
export default {
  render(h) {
    const { routeMap, current } = this.$router

    const component = routeMap[current].component || null

    return h(component)
  }
}