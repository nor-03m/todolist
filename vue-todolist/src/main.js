import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyDaZuRBFojbV_-W3cw2aL3i82W17cr6WPc",
  authDomain: "todo-758aa.firebaseapp.com",
  projectId: "todo-758aa",
  storageBucket: "todo-758aa.appspot.com",
  messagingSenderId: "189101393927",
  appId: "1:189101393927:web:27a7bc3958a8c5cad182a2",
  measurementId: "G-MVERJ5P0GN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
