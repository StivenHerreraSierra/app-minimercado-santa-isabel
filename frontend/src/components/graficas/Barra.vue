<template>
  <div>
    <apexchart
      width="500"
      type="bar"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props: ["chartOptions", "data"],
  data: function () {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        tooltip: {
            enabled: this.chartOptions.tooltip.enabled,
            fixed: {
                enabled: this.chartOptions.tooltip.fixed,
            },
            x: {
                show: this.chartOptions.tooltip.x,
            }
        },
        plotOptions: {
          bar: {
            horizontal: this.chartOptions.bar.horizontal,
            dataLabels: {
              position: this.chartOptions.bar.posLabel,
            },
          },
        },
        title: {
          text: this.chartOptions.title.text,
          align: this.chartOptions.title.align,
        }
      },
      series: [
        {
          data: this.data
        },
      ],
    };
  },
};
</script>