<template>

    <div v-if="today?.weather?.icon" class="border rounded shadow mb-5">
        <div>{{ today.valid_date }}</div>
        <img :src="`https://www.weatherbit.io/static/img/icons/${today.weather.icon}.png`" :alt="today.weather.description" />
        <div>{{ today.weather.description }}</div>
        <div>High: {{ today.max_temp }} °C</div>
        <div>Low: {{ today.min_temp }} °C</div>
    </div>

    <div class="col">
    <div v-if="dayData?.weather?.icon" class="border rounded shadow">
        <div>{{ dayData.valid_date }}</div>
        <img :src="`https://www.weatherbit.io/static/img/icons/${dayData.weather.icon}.png`" :alt="dayData.weather.description" />
        <div>{{ dayData.weather.description }}</div>
        <div>High: {{ dayData.max_temp }} °C</div>
        <div>Low: {{ dayData.min_temp }} °C</div>
    </div>
    </div>

</template>
  
  
<script setup>

defineProps({
dayData: Object,
today: Object
})

</script>
  
  
<style scoped>
</style>