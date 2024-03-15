<script>
export default {
  name: "Header",
};
</script>

<template>
  <header>
    <div class="header-nav">
      <div class="header-container">
        <router-link to="/">File</router-link>
        <router-link to="/data">Data</router-link>
        <router-link to="/analysis">Analysis</router-link>
      </div>
    </div>
  </header>
</template>

<style>
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.header-container {
  z-index: 5;
  background-color: #f3f3f3 !important;
  display: flex;
  justify-content: flex-end;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  padding-right: 100px;
}

.header-nav a {
  color: black;
  margin-left: 20px;
  text-decoration: none;
  padding: 0px 5px;
}
</style>
