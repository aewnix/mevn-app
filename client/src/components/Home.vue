<template>
  <div class="content">
      <h1>Výpočitajte si cenu poistneho</h1>
      <Calculator></Calculator>

    <section id="history">
      <h2>História výpočtov</h2>
      <History></History>
    </section>

  </div>
  <PriceSettings></PriceSettings>
</template>

<script>
import History from "@/components/History";
import Calculator from "@/components/Calculator";
import PriceSettings from "@/components/PriceSettings";

export default {
  name: "Home",
  components: {History,Calculator, PriceSettings},

}
</script>
