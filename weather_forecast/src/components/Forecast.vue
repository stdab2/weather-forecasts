<template>

    <div class="mb-4">
        <div class="fw-bold fs-4">Welcome to {{ currentCity }} weather</div>
        <div class="fw-bold fs-4">{{ countryCode }}</div>
        <div class="fw-bold text-success fs-4">Enjoy your day</div>
    </div>
    <ForecastDay :today="currentDay" />
    <div class="text-primary fw-bold mb-4 fs-4">Here are the forecasts for the next {{ size }} days</div>
    <div class="row row-cols-2 row-cols-lg-3 g-4 g-lg-5">
    <ForecastDay v-for="(day, index) in forecastData" :key="index" :dayData="day" />
    </div>

</template>
  
  
  
  
  <script setup>
  import { ref, watch, onMounted} from 'vue'
  import ForecastDay from './ForecastDay.vue';
  
  const props = defineProps({
    longitude: { type: Number, default: null },
    latitude: { type: Number, default: null }
  })
  
  const forecastData = ref([])
  const currentDay = ref({})
  const currentCity = ref(null)
  const countryCode = ref(null)
  const size = ref(null)
  
  const fetchForecast = async () => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${props.latitude}&lon=${props.longitude}&key=${apiKey}&days=12`
  
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
    fetchForecast
  })
  
  watch (() => [props.longitude, props.latitude], fetchForecast)
  
  </script>
  
  
  <style scoped>
  </style>