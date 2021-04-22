<template>
  <div class="about">
    <h1 @click="link">This is an about page</h1>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    link() {
      // this.$router.push('/')
      this.$router.push({
        path: '/',
        query: {
          a: 1,
          b: 2
        }
      })
    }
  }
}
</script>
