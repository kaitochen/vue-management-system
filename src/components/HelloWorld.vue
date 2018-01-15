<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h5>{{test}}</h5>
    <el-button>test</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      test: 'just for test'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
