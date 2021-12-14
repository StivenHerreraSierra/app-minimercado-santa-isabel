<template>
  <div>
    <apexchart
      width="500"
      type="donut"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props: ["chartOptions", "series"],
};
</script>