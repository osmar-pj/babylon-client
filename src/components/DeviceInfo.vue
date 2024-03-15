<script>
import { ref, reactive } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    VueApexCharts,
  },
  data() {
    return {
      chartData: [],
    };
  },
  props: {
    point: {
      type: [],
      default: [],
    },
  },
  methods: {},
  created() {
    const seriesData1 = reactive([0.3, 1.3, 0.7, 2, 1.2, 1, 3, 1.4, 1.5, 1.6]);

    this.chartData = reactive({
      series: [
        {
          name: "My First series",
          data: seriesData1,
        },
      ],
      options: {
        chart: {
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            speed: 200,
            animateGradually: {
              enabled: false,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 150,
            },
          },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          type: "datatime",
        },
        stroke: {
          show: true,
          curve: "smooth",
        },
      },
    });
  },
};

// window.setInterval(() => {
//   insertNewVal();
// }, 1500);
</script>

<template>
  <div class="detail-container" style="z-index: 100">
    <div class="detail-title">{{ point[0].device }}</div>
    <div class="row">
      <div class="col-4" v-for="(item, index) in point" :key="index">
        <p class="item-nm">{{ item.nm }}</p>

        <div class="itme-content" style="display: flex">
          <div
            class="custom-bullet"
            :style="{ backgroundColor: item.color }"
          ></div>
          <p class="item-value">
            {{ item.value }}
            <span class="unit-nm">{{ item.und }}</span>
          </p>
        </div>
      </div>
    </div>

    <div id="app">
      <VueApexCharts :options="chartData.options" :series="chartData.series" />
    </div>
  </div>
</template>

<style scoped>
.custom-bullet {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  margin-top: 14px;
  margin-right: 14px;
}
.item-value {
  font-weight: 700;
  font-size: 2em;
}
.unit-nm {
  font-size: 0.5em;
  font-weight: 200;
}
.detail-container {
  text-align: center;
  padding: 30px;
  width: 500px;
  border-radius: 32px;
  background-color: rgba(248, 246, 246, 0.678);
  position: absolute;
  top: 100px;
  right: 60px;
}
.item-nm {
  padding: 0px !important;
  margin: 0px !important;
  line-height: 24px;
}
.detail-title {
  font-weight: 700;
  font-size: 2em;
}
</style>
