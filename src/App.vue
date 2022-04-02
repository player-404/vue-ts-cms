<script lang="ts" setup>
import instance from "./api/myApiTest";

type data = {
  msg: string;
};

const getTestData = async () => {
  const data = await instance.request<data>({
    method: "get",
    url: "/test",
    showLoading: false,
    interceptors: {
      requestErrorIntercrptors(error) {
        return Promise.reject(error);
      },
    },
  });
  console.log(data.data.msg);
};
getTestData();
</script>
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <el-button>this is button</el-button>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
