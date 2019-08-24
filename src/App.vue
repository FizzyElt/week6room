<template>
  <div id="app">
    <nav class="nav">
      <div class="top-nav-container">
        <div class="logo">
          <span>TRAVEL</span>
        </div>
        <div class="nav-text">
          <span>找房源</span>
        </div>
      </div>
      
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Noto+Serif+TC&display=swap");
* {
  font-size: 20px;
  font-family: "Noto Serif TC", serif;
}
body {
  background: #f2f2f2;
}
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav {
  width: 100%;
}
.top-nav-container {
  background: white;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  div {
    min-height: 60px;
  }
  span {
    height: 100%;
    margin: 0 25px;
    line-height: 3;
  }
}
.logo {
  letter-spacing: 6.4px;
  background: #2a58a8;
  span {
    color: white;
  }
}

</style>
