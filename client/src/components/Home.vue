<template>
  <div class="content">
      <h1>Výpočitajte si cenu poistneho</h1>
      <Calculator></Calculator>

    <section id="history">
      <h2>História predchádzajúcich výpočtov</h2>
      <History></History>
    </section>

  </div>
  <PriceSettings></PriceSettings>
</template>

<script>
import History from "@/components/History";
import Calculator from "@/components/Calculator";
import PriceSettings from "@/components/PriceSettings";
//TODO: in real project I would have use the l18n for multi-language strings in app
// TODO: use vuex to manage state between Calculator && History - rn History loads only on page load
export default {
  name: "Home",
  components: {History,Calculator, PriceSettings},

}
</script>
