<template>
  <h1 id="name-title">Veera Kuisma</h1>
  <div class="nav-wrapper">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">Biography</router-link>
      <router-link to="/about">Projects</router-link>
      <router-link to="/about">Calendar</router-link>
      <router-link to="/about">Contact</router-link>
    </div>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#name-title {
  text-transform: uppercase;
  font-size: 90px;
  letter-spacing: 2px;
  margin: 40px 0 15px 0;
}

.nav-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

#nav {
  width: 680px;
  display: flex;
  justify-content: space-evenly;

  a {
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
