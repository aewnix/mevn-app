<template>
  <table>
    <tr>
      <th>Variant poistenia</th>
      <th>Počet osôb</th>
      <th>Začiatok poistenia</th>
      <th>Koniec poistenia</th>
      <th>Balík</th>
      <th>Pripoistenia</th>
      <th>Total</th>
    </tr>
    <tr v-for="e in history" :key="e._id">
      <td>{{ e.timePeriod }}</td>
      <td>{{ e.persons }}</td>
      <td>{{ e.startDate }}</td>
      <td>{{ e.endDate }}</td>
      <td>{{ e.packageType }}</td>
      <td>{{ e.extraServices }}</td>
      <td>{{ e.total }}</td>
    </tr>
  </table>
</template>

<script>
import API from "@/api";

export default {
  name: "History",
  data() {
    return {
      history: [],
    }
  },
  async created() {
    this.history = await API.getHistory();
  }

}
</script>

<style scoped>

</style>
