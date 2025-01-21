<script setup>
import { ref } from 'vue'

const props = defineProps({
    city: { type: String, default: null },
    day: { type: Object, default: null }
  })

const content = ref(``)
if(props.day?.weather?.icon) {
    content.value = `You are a useful assistant. A user wants to know 5 activities to do based on the weather. 
    He lives in ${props.city} and the weather is ${props.day.weather.description}. 
    High temperature of the day: ${props.day.max_temp}. 
    Lowest temperature of the day: ${props.day.min_temp}. 
    Use a spartan tone and keep it short. Exampple: 
    Here are 5 activities you can do even on a raining day in Quebec 
    1. Stay indoors and watch movies or read a book. 
    2. Do a puzzle or play board games. 
    3. Bake or cook a new recipe. 
    4. Work on indoor home projects. 
    5. Exercise at home with a workout video or yoga. Stay safe and enjoy your day.`
}
const BTN_TEXT = 'Recommandation 🚀'
const res = ref('')
const btnText = ref(BTN_TEXT)

async function createCompletionsChat() {
  try {
    btnText.value = 'Thinking...🤔'

    const userMessages = [{ role: 'user', content: content.value }]

    const requestData = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: userMessages,
      stream: true,
    })

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPEN_API_KEY}`,
      },
      body: requestData,
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', fetchOptions)
    const reader = response.body.getReader()
    res.value = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunkStr = new TextDecoder('utf-8').decode(value)
      const lines = chunkStr
        .split('\n')
        .filter((line) => line !== '' && line.length > 0)
        .map((line) => line.replace(/^data: /, '').trim())
        .filter((line) => line !== '[DONE]')
        .map((line) => JSON.parse(line))
      for (const line of lines) {
        const {
          choices: [
            {
              delta: { content },
            },
          ],
        } = line
        if (content) {
          res.value += content
        }
      }
    }
    console.log('Stream ended.')
  } catch (error) {
    console.error(error)
    res.value = error.response.data.error.message
  } finally {
    btnText.value = BTN_TEXT
  }
}

const askAi = () => {
  createCompletionsChat()
}
</script>

<template>
    <div class="chat">
      <div class="button-block">
        <button type="button" @click="askAi" class="btn">
          <strong>{{ btnText }}</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>
          <div id="glow">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </button>
      </div>
      <div class="card">
        <pre>{{ res }}</pre>
      </div>
    </div>
  </template>
  
  <style scoped>
  h1 {
    margin-bottom: 64px;
  }
  
  @keyframes justshake {
    25% {
      transform: translateX(5px);
    }
    50% {
      transform: translateX(-5px);
    }
  
    75% {
      transform: translateX(5px);
    }
  
    100% {
      transform: translateX-(5px);
    }
  }
  
  button {
    cursor: pointer;
    height: 32px;
    font-size: 16px;
    margin-top: 24px;
    background: royalblue;
    color: white;
    padding: 0.7em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.2s;
  }
  
  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }
  
  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }
  
  .button-block {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }
  
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 8rem;
    max-width: 13rem;
    height: 3rem;
    background-size: 300% 300%;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
    transition: 0.5s;
    animation: gradient_301 5s ease infinite;
    border: double 4px transparent;
    background-image: linear-gradient(#212121, #212121),
      linear-gradient(137.48deg, #ffdb3b 10%, #fe53bb 45%, #8f51ea 67%, #0044ff 87%);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
  
  .card {
      margin-bottom: 25px;
  }
  
  #container-stars {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
  }
  
  strong {
    z-index: 2;
    font-size: 16px;
    color: #ffffff;
    text-shadow: 0 0 4px white;
  }
  
  #glow {
    position: absolute;
    display: flex;
    width: 12rem;
  }
  
  .circle {
    width: 100%;
    height: 30px;
    filter: blur(2rem);
    animation: pulse_3011 4s infinite;
    z-index: -1;
  }
  
  .circle:nth-of-type(1) {
    background: rgba(254, 83, 186, 0.636);
  }
  
  .circle:nth-of-type(2) {
    background: rgba(142, 81, 234, 0.704);
  }
  
  .btn:hover #container-stars {
    z-index: 1;
    background-color: #212121;
  }
  
  .btn:hover {
    transform: scale(1.1);
  }
  
  .btn:active {
    border: double 4px #fe53bb;
    background-origin: border-box;
    background-clip: content-box, border-box;
    animation: none;
  }
  
  .btn:active .circle {
    background: #fe53bb;
  }
  
  #stars {
    position: relative;
    background: transparent;
    width: 200rem;
    height: 200rem;
  }
  
  #stars::after {
    content: '';
    position: absolute;
    top: -10rem;
    left: -100rem;
    width: 100%;
    height: 100%;
    animation: animStarRotate 90s linear infinite;
  }
  
  #stars::after {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
  }
  
  #stars::before {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    width: 170%;
    height: 500%;
    animation: animStar 60s linear infinite;
  }
  
  #stars::before {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
    opacity: 0.5;
  }
  
  @keyframes animStar {
    from {
      transform: translateY(0);
    }
  
    to {
      transform: translateY(-135rem);
    }
  }
  
  @keyframes animStarRotate {
    from {
      transform: rotate(360deg);
    }
  
    to {
      transform: rotate(0);
    }
  }
  
  @keyframes gradient_301 {
    0% {
      background-position: 0% 50%;
    }
  
    50% {
      background-position: 100% 50%;
    }
  
    100% {
      background-position: 0% 50%;
    }
  }
  
  @keyframes pulse_3011 {
    0% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
  
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
  
    100% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
  </style>