<template>
  <v-app>
    <v-main>
      <v-toolbar color="amber darken-1">ToDo List</v-toolbar>
      <ToDo/>
    </v-main>
  </v-app>
</template>

<script>
import ToDo from './components/ToDo';

export default {
  name: 'App',

  components: {
    ToDo,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
</style>
