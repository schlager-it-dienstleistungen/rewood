<template>
  <v-app>
    <transition name="fade-in-up">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<style lang="scss">
@import "~vuetify/src/styles/styles.sass";

.theme--light.v-application {
  background: transparent !important;
}
.v-application code {
  box-shadow: none !important;
}
</style>

<script>
import Vue from "vue";

// workaround
// https://github.com/vuetifyjs/vuetify/issues/9999
const ignoreWarnMessage = `The .native modifier for v-on is only valid on components but it was used on <div>.`;
// eslint-disable-next-line no-unused-vars
Vue.config.warnHandler = function(msg, vm, trace) {
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
};

export default {
  components: {}
};
</script>
