<template>
  <div class="chat-box" :style="{ width: isChatOpen ? '350px' : '50px' }">
    <div class="chat-header d-flex align-items-center justify-content-center" @click="toggleChat"
      :style="{ borderBottomLeftRadius: isChatOpen ? '0px' : '1rem', borderBottomRightRadius: isChatOpen ? '0px' : '1rem' }">
      <span class="material-symbols-outlined" :class="{ 'me-2': isChatOpen }">smart_toy</span>
      <span v-if="isChatOpen">WMS Chatbot</span>
    </div>
    <div v-if="isChatOpen" class="chat-content">
      <div class="messages">
        <div v-if="messages.length === 0" class="welcome-message">Bạn có câu hỏi gì muốn hỏi tôi?</div>
        <div v-for="(message, index) in messages" :key="index" :class="message.sender">
          <p>{{ message.text }}</p>
        </div>
      </div>
      <div class="chat-input">
        <input v-model="userInput" class="form-control" @keyup.enter="sendMessage" placeholder="Nhập tin nhắn..." />
        <button @click="sendMessage" class="d-flex align-items-center">
          <span class="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isChatOpen = ref(false);
const userInput = ref('');
const messages = ref([]);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  messages.value.push({ sender: 'user', text: userInput.value });
  const userMessage = userInput.value;
  userInput.value = '';

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer`, // Replace with your API token
      },
      body: JSON.stringify({ inputs: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const aiText = data[0]?.generated_text || 'No response from AI.';
    messages.value.push({ sender: 'ai', text: aiText });
  } catch (error) {
    console.error('Error sending message:', error);
    messages.value.push({ sender: 'error', text: 'Đã xảy ra lỗi, vui lòng thử lại.' });
  }
};
</script>

<style scoped>
.chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 1px solid var(--border-main-color);
  border-radius: 1rem;
  background-color: var(--background-color);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chat-header {
  padding: 15px 15px;
  background-color: var(--primary-color);
  color: var(--background-color);
  cursor: pointer;
  text-align: center;
  border-radius: 1rem;
}

.chat-content {
  padding: 10px;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.messages .user {
  text-align: right;
}

.messages .ai {
  text-align: left;
}

.messages .error {
  color: red;
}

.welcome-message {
  padding: 10px;
  height: 300px;
  text-align: center;
  color: gray;
}

.chat-input {
  display: flex;
}

.chat-input input {
  flex: 1;
  padding: 5px;
  border: 1px solid var(--border-main-color);
  border-radius: 5px;
}

.chat-input button {
  padding: 10px 15px;
  margin-left: 5px;
  background-color: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 1rem;
  cursor: pointer;
}
</style>
