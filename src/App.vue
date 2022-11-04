<script setup lang="ts">
import { ref, watch } from 'vue'
import { io } from 'socket.io-client'
import MessageBox from './components/MessageBox.vue'
import { useWebSocket, WebSocketStatus } from '@vueuse/core'
// const socket = io('http://127.0.0.1:3002')
const { status, data, send, open, close } = useWebSocket('ws://127.0.0.1:5173')
watch([status, data], ([status, data]) => {
  console.log('status==>', status, data)
  if (status === 'OPEN' && data != null) {
    if (Object.prototype.toString.call(data) === '[object Blob]') {
      data.text().then((text) => {
        messageList.value.push(text)
      })
    } else {
      messageList.value.push(data)
    }
  }
})

const inputValue = ref('')
// socket.on('connect', () => {
//   console.log(socket.id)
//   console.log('连接成功')
// })
// socket.on('send message', (msg) => {
//   console.log('msg===>', msg)
//   context.value = msg
//   messageList.value.push(msg)
// })

const context = ref('')

const onSubmit = () => {
  // socket.emit('chat message', inputValue.value)
  send(inputValue.value)
}
const messageList = ref([])
</script>

<template>
  <input type="text" v-model="inputValue" /><button @click="onSubmit">
    发送
  </button>
  websocket board
  <div>{{ context }}</div>
  <!-- <ul>
    <li v-for="(msg) in messageList">{{msg}}</li>
  </ul> -->
  <div class="messageArea" v-if="messageList.length">
    <template v-for="msg in messageList" :key="index">
      <MessageBox :message-context="msg" />
    </template>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.messageArea {
  position: fixed;
  bottom: 0;
  right: 0;
  max-height: 100vh;
  overflow-y: scroll;
}
</style>
