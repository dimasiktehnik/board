<template>
  <div id="app">
    <router-link to="/kanban">to kanban</router-link>
    <br>
    <router-link to="/">to home</router-link>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    window.onbeforeunload = (e) => {
      const returnText = 'test'
      e.returnValue = returnText
      return returnText
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #333;
}
</style>
