<template>
  <div>
    <div>
      <Navigation></Navigation>
      <Forecast :latitude="geoLocation.latitude" :longitude="geoLocation.longitude"/>
    </div>
  </div>
</template>




<script setup>
import { ref, onMounted} from 'vue'
import Forecast from './components/Forecast.vue';
import Navigation from './components/Navigation.vue';


const geoLocation = ref({
  longitude : null,
  latitude : null
})

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

onMounted(() => {
  getLocation()
})

</script>



<style scoped>
</style>
