
<script>
import axios from "axios";
import BabylonScene from "../components/BabylonScene.vue";
import CONST_URL from "../const/const";
// import { socket } from "@/socket";
import DeviceInfo from "../components/DeviceInfo.vue";

const DATA_URL = CONST_URL.API_URL;

export default {
  name: "Data",

  data() {
    return {
      data_url: null,
      engine: null,
      scene: null,
      pointArray: [],
      selectedIdx: -1,
      device_url: [],
      url: "",
      devices: [],
      hasChanged: true,
    };
  },
  components: {
    DeviceInfo,
    BabylonScene,
  },
  computed: {},
  methods: {
    setSelectValue(idx = -1) {
      this.selectedIdx = idx;
    },

    async myGetUrl() {
      const response = await axios.get(DATA_URL + "get_data");
      let { d_map, devices } = response.data;
      // let url = `${DATA_URL}downloads?filename=${d_map[0].name}`;
      let url = `${DATA_URL}downloads?filename=map.glb`;
      var device_url = [];
      devices.forEach((device) => {
        device_url.push(`${DATA_URL}downloads?filename=${device.name}`);
        device_url.push(`${DATA_URL}downloads?filename=tub.glb`);
      });
      return { url, device_url };
    },
    async myGetGraphData() {
      const g_url = "https://server.paranoid.lat/hist/:";
      const response = await axios.get(g_url + "1");
      console.log("----", response.data);
    },
  },
  computed: {},
  async mounted() {
    /**
     * This is soccet part.
     */

    // socket.on("data", (data) => {
    //   console.log(data);
    //   this.pointArray = [...data];
    // });
    // console.log(this.$store.state.scene);
    // if (this.$store.state.scene) {
    //   this.$store.state.scene.dispose();
    //   this.$store.commit("setScene", null);
    // }

    // Test data from Socket.
    this.pointArray = [
      {
        _id: "64904c0598fd23160ffcc5c3",
        device: "RP 9895 SW (-)",
        nm: "CO",
        value: 26,
        und: "ppm",
        color: "orange",
      },
      {
        _id: "64904bc798fd23160ffcc5a0",
        device: "RP 9895 SW (-)",
        nm: "NO2",
        value: 0,
        und: "ppm",
        color: "red",
      },
      {
        _id: "64904b2998fd23160ffcc547",
        device: "RP 9895 SW (-)",
        nm: "CO2",
        value: 0.02,
        und: "%",
        color: "yellow",
      },
    ];
    const { url, device_url } = await this.myGetUrl();
    console.log(device_url, url);
    this.device_url = device_url;
    this.url = url;
  },
};
</script>

<template style="padding: 0px">
  <BabylonScene
    ref="babylonComponent"
    :p_url="url"
    :p_device_url="device_url"
    :point="pointArray"
    v-if="url != ''"
    @cu-event="setSelectValue"
  />

  <div v-if="$route.path == '/analysis'">
    <div class="total-detail-info" v-if="pointArray.length > 0">
      <div v-for="(device, idx) in device_url">
        <DeviceInfo :point="pointArray" :key="idx" v-if="selectedIdx == idx" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.canvas-container {
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
#src_canvas {
  width: 100%;
  z-index: 5;
  background-color: white;
  height: 40px;
}

#sourceParent {
  position: absolute;
  top: 150px;
  left: 20px;
  z-index: 1;
  height: inherit;
}
</style>
