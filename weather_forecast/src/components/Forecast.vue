<template>

    <div class="mb-4">
        <div class="fw-bold fs-4">Welcome to {{ currentCity }} weather</div>
        <div class="fw-bold fs-4">{{ countryCode }}</div>
        <div class="fw-bold text-success fs-4">Enjoy your day</div>
    </div>
    <form>
        <div class="form-check form-switch">
            <input 
                class="form-check-input" 
                type="checkbox" 
                id="customSwitch1" 
                v-model="toggleState"
            >
        </div>
    </form>
    <div v-if="toggleState">
      <Recommandation :city="currentCity" :day="currentDay" />
      <h4>GET RECOMMENDATION: ACTIVE</h4>
    </div>
    <h4 v-else>GET RECOMMENDATION: INACTIVE</h4>
    <ForecastDay :today="currentDay" />
    <div class="text-primary fw-bold mb-4 fs-4">Here are the forecasts for the next {{ size }} days</div>
    <div class="row row-cols-2 row-cols-lg-3 g-4 g-lg-5">
    <ForecastDay v-for="(day, index) in forecastData" :key="index" :dayData="day" />
    </div>

</template>
  
  
  
  
  <script setup>
  import { ref, watch, onMounted} from 'vue'
  import ForecastDay from './ForecastDay.vue';
  import Recommandation from './Recommandation.vue';

  const geoLocation = ref({
  longitude : null,
  latitude : null
  })
  
  const toggleState = ref(true)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          geoLocation.value.longitude = position.coords.longitude
          geoLocation.value.latitude = position.coords.latitude
        },
        error => {
          console.error("GeoLocation Error:", error.message)
        }
      )
    }
    else {
      console.error("Geolocation not supported")
    }
  }
  
  const forecastData = ref([])
  const currentDay = ref({})
  const currentCity = ref(null)
  const countryCode = ref(null)
  const size = ref(null)
  
  const fetchForecast = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${geoLocation.value.latitude}&lon=${geoLocation.value.longitude}&key=${apiKey}&days=12`
  
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(response.statusText)

      const parsedData = await response.json()
      currentDay.value = parsedData.data[0]
      forecastData.value = parsedData.data.slice(1)
      currentCity.value = parsedData.city_name
      countryCode.value = parsedData.country_code
      size.value = forecastData.value.length
    } catch (error) {
      console.error ("Error fetching weather data:", error)
    }
  }
  
  onMounted(() => {
    getLocation()
    fetchForecast
  })
  
  watch (() => [geoLocation.value.longitude, geoLocation.value.latitude], fetchForecast)
  
  </script>
  
  
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