<template>
  <transition name="fade-in-up">
    <router-view></router-view>
  </transition>
</template>

<style lang="scss" scoped>
@import "~bootstrap-vue/dist/bootstrap-vue.css";
</style>

<script>
export default {
  components: {}
};
</script>
