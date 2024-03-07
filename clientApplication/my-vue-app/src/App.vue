<template>
  <div id="app">
    <input-form />
    <user-list />
  </div>
</template>

<script>
import InputForm from './components/InputForm.vue';
import UserList from './components/UserListComponent.vue';

export default {
  components: {
    InputForm,
    UserList
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
