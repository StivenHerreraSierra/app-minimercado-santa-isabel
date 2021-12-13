<template>
  <div>
    <apexchart
      width="500"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props: ["chartOptions", "data"],
  data: function () {
    return {
      series: [
        {
          data: this.data
        },
      ],
    };
  },
};
</script>