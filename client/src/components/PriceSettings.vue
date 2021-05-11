<template>
  <div id="settings" :class="{ opened: isOpened}">
    <h2 @click="isOpened= !isOpened">Cenník</h2>
    <form @submit.prevent="submitForm">
      <h3>Krátkodobé poistenie</h3>
      <div><label for="basicPrice">Základný</label>
        <input type="number" min="0" id="basicPrice" v-model="prices.short.basic" step="0.01">€/deň
      </div>
      <div>
        <label for="extendedPrice">Rozšírený</label>
        <input type="number" min="0" id="extendedPrice" v-model="prices.short.extended" step="0.01">€/deň
      </div>
      <div>
        <label for="extraPrice">Extra</label>
        <input type="number" min="0" id="extraPrice" v-model="prices.short.extra" step="0.01">€/deň
      </div>
      <div>
        <label for="cancelationShort">storno cesty</label>
        <input type="number" min="0" id="cancelationShort" v-model="prices.short.cancellation" step="0.1">%
      </div>
      <div>
        <label for="sportShort">športové aktivity</label>
        <input type="number" min="0" id="sportShort" v-model="prices.short.sport" step="0.1">%
      </div>

      <h3>Celoročné poistenie</h3>
      <div>
        <div>
          <label for="basicYearly">Základný</label>
          <input type="number" min="0" id="basicYearly" v-model="prices.yearly.basic" step="0.01">€/deň
        </div>
        <div>
          <label for="extendedYearly">Rozšírený</label>
          <input type="number" min="0" id="extendedYearly" v-model="prices.yearly.extended" step="0.01">€/deň
        </div>
        <div>
          <label for="extraYearly">Extra</label>
          <input type="number" min="0" id="extraYearly" v-model="prices.yearly.extra" step="0.01">€/deň
        </div>
        <div>
          <label for="cancelationYearly">storno cesty</label>
          <input type="number" min="0" id="cancelationYearly" v-model="prices.yearly.cancellation" step="0.1">%
        </div>
        <div>
          <label for="sportYearly">športové aktivity</label>
          <input type="number" min="0" id="sportYearly" v-model="prices.yearly.sport" step="0.1">%
        </div>
      </div>
      <div class="buttons">
        <button type="submit">Uložiť</button>
        <button @click="isOpened= !isOpened" id="close"> Zatvoriť</button>
      </div>
    </form>
  </div>
</template>

<script>
// import {reactive} from "vue";
// import useValidate from "@vuelidate/core";
import API from "@/api";

export default {
  name: "priceSettings",
  data() {
    return {
      isOpened: false,
      prices: {},
    }
  },
  async created() {
    this.prices = await API.getPrices();
  },
  methods: {
    // Handle form
    async submitForm() {
      await API.updatePrices(this.prices);
    }
  }

}
// export default {
//   name: "priceSettings",
//   setup:  function () {
//     const state = reactive({
//       isOpened: false,
//       prices: {},
//     });
//     const v$ = useValidate(state);
//     return {state, v$}
//   },
//
//   // Get prices
//   async created() {
//     this.state.prices = await API.getPrices();
//   },
//
//   methods: {
//     // Handle form
//     async submitForm() {
//       await API.updatePrices(this.state.prices);
//     }
//   }
// }
</script>

<style scoped>

</style>
