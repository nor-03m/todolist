<template>
  <v-app>
    <v-main>
      <v-toolbar clas="todolist" color="blue-grey darken-1">ToDo List</v-toolbar>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap');

.v-toolbar__content, .v-toolbar__extension{
  font-family: 'Nunito Sans', sans-serif;
  font-size: 24px;
  color: white;
}

</style>
