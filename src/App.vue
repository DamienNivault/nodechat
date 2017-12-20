<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <form action="#" @submit.prevent="send">
        <label for="pseudo"> Pseudo : </label>
        <input type="text" id="pseudo" v-model.trim="pseudo">

        <label for="message"> Message : </label>
        <input type="text" id="message" v-model.trim="message" placeholder="Plop all" autofocus>
        <input type="submit" value="Submit">
    </form>
    <ul>
        <li v-for="(message, index) of messages" :key="index">
             <strong> {{message.author}} </strong> écrit: {{message.text}}
         </li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "app",
  data() {
    return {
      pseudo: null,
      message: null,
      socket: null,
      messages: [],
      msg: "ReactJs > Dépour-VueJs / Yarn > Npmalaise"
    };
  },
  methods: {

      send() {
        const newMessage = {
            author: this.pseudo,
            text: this.message
      };
      this.socket.emit('message', newMessage)

      this.messages.push(newMessage)
    }
  },
  created() {
    this.socket = io("//localhost:50437");
    this.socket.on("message", message => {
      this.messages.push(message);
    });
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
