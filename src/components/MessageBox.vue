<template>
  <div class="messageContainer" @click="handleClickMessageBox">
    又有新消息啦！（{{readStatus ? '已读' : '未读' }}）
    <div>{{messageContext}}</div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'MessageBox'
}
</script>
<script setup lang="ts">import { ref } from 'vue';

type PropsType = {
  messageContext: string
}
const props = withDefaults(defineProps<PropsType>(), {
  messageContext: '默认内容'
}) 
const readStatus = ref(false)


const handleClickMessageBox = () => {
  readStatus.value = true
}
</script>

<style lang="scss" scoped>
.messageContainer{
  width: 300px;
  padding: 10px;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #f2f2f2;
  cursor: pointer;
}
</style>
