// h函数返回component vdom
export default {
  render(h) {
   
    const { routeMap, current } = this.$router
    console.log('routeMap', routeMap, current)
    const component = routeMap[current].component || null

    return h(component)
  }
}