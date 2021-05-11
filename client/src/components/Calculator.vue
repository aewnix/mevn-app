<template>
  <div class="row">
    <div class="column">
      <form @submit.prevent="submitForm">
        <!-- Variant poistenia-->
        <div class="row">
          <div class="formElement">Variant poistenia
            <input type="radio" id="short" value="short" v-model="state.formData.timePeriod"
                   :rules="state.rules">
            <input type="radio" id="yearly" value="yearly" v-model="state.formData.timePeriod" :rules="state.rules">
            <div class="optionsBox">
              <label for="short" class="box" v-bind:class="state.formData.timePeriod ==='short' ? 'selected':''">Krátkodobé</label>
              <label for="yearly" class="box" v-bind:class="state.formData.timePeriod  ==='yearly'? 'selected':''">Celoročné</label>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="column">
            <!-- Začiatok poistenia -->
            <div class="formElement">
              <label for="startDate">Začiatok poistenia</label>
              <input type="date" id="startDate" v-model="state.formData.startDate" :rules="state.rules">
              <span class="error" v-if="v$.formData.startDate.$error">Toto pole nie je správne vyplnené!</span>
            </div>
          </div>

          <div class="column">
            <!-- Koniec poistenia -->
            <div class="formElement">
              <label for="endDate">Koniec poistenia</label>
              <input type="date" id="endDate" v-model="state.formData.endDate">
              <span class="error" v-if="v$.formData.endDate.$error">Toto pole nie je správne vyplnené!</span>
            </div>
          </div>
        </div>


        <!-- Balík -->
        <div class="row">
          <div class="formElement">Balík <input type="radio" id="basic" value="basic"
                                                v-model="state.formData.packageType"
                                                :rules="state.rules">
            <input type="radio" id="extended" value="extended" v-model="state.formData.packageType"
                   :rules="state.rules">
            <input type="radio" id="extra" value="extra" v-model="state.formData.packageType" :rules="state.rules">
            <div class="packageOptions">
              <label for="basic" class="box" v-bind:class="state.formData.packageType  ==='basic'? 'selected':''">Základný</label>
              <label for="extended" class="box" v-bind:class="state.formData.packageType  ==='extended'? 'selected':''">Rozšírený</label>
              <label for="extra" class="box"
                     v-bind:class="state.formData.packageType  ==='extra'? 'selected':''">Extra</label>
            </div>
          </div>
          <span class="error" v-if="v$.formData.packageType.$error">This field is required!</span>
        </div>

        <!-- Pripoistenia -->
        <div class="formElement">Pripoistenia <input type="checkbox" id="cancellation" value="cancellation"
                                                     v-model="state.formData.extraServices"><label
            for="cancellation">storno cesty</label>
          <input type="checkbox" id="sport" value="sport" v-model="state.formData.extraServices"><label for="sport">športové
            aktivity</label>
        </div>
        <!-- Počet osôb -->
        <div class="formElement">
          <label for="persons">Počet osôb</label>
          <input id="persons" v-model="state.formData.persons" :rules="state.rules" type="number" min="1"
                 max="3">
          <span class="error" v-if="v$.formData.packageType.$error">This field is required!</span>
        </div>
        <!-- Submit form-->
        <button type="submit">Výpočitať</button>
      </form>
    </div>
    <div class="column">
      <img :src="require('../assets/PMT_M216_04.svg')" alt="">
      <div id="total">
        <h2>Cena poistenia</h2>
        <span>{{ state.total }} €</span>
      </div>
    </div>

  </div>
</template>

<script>
import {computed, reactive} from "vue";
import {maxValue, minValue, required} from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import API from "@/api";

export default {
  name: "Calculator",
  setup: function () {
    const state = reactive({
      formData: {
        timePeriod: 'short',
        startDate: '',
        endDate: '',
        packageType: 'basic',
        extraServices: [],
        persons: 1,
      },
      total: 0.00,
    });

    // End date validation
    function checkEndDate(value) {
      return new Date(value) > new Date(state.formData.startDate);
    }

    const rules = computed(() => {
      return {
        formData: {
          timePeriod: {required},
          startDate: {required},
          endDate: state.formData.timePeriod === 'short' ? [required, (value) => checkEndDate(value)] : '',
          packageType: {required},
          extraServices: {},
          persons: [minValue(1), maxValue(3)],
        }
      }
    });

    const v$ = useValidate(rules, state);
    return {state, v$}
  },
  methods: {
    async submitForm() {
      // Form validation
      await this.v$.$validate();
      if (!this.v$.$error) {
        // Get total
        const response = await API.getTotal(this.state.formData);
        this.state.total = response.total

        // TODO: emit event to update history
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
