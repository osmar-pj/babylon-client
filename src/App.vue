<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
