<script setup lang="ts">
import Process from "./Progress.vue";

import SignUpSuccess from "./SignUpSuccess.vue";

import { watch, ref } from "vue";

const props = defineProps(["phoneValidateStatus"]);

let activeComponent = ref("Process");

const com: any = {
  Process,
  SignUpSuccess,
};

watch(
  () => props,
  (newv) => {
    if (newv.phoneValidateStatus) {
      let timer = setTimeout(() => {
        activeComponent.value = "SignUpSuccess";
        clearTimeout(timer);
      }, 1000);
    }
  },
  { deep: true }
);
</script>
<template>
  <div class="sign-up-complete">
    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
      <component
        :is="com[activeComponent]"
        :resultStatus="props.phoneValidateStatus"
      />
    </Transition>
  </div>
</template>
<style lang="scss" scoped>
.sign-up-complete {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
