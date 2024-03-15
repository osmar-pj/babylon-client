<script>
import InsertDeviceGroup from "@/components/InsertDeviceGroup.vue";
import CONST_URL from "../const/const.js";

import axios from "axios";
const BACKEND_URL = CONST_URL.API_URL + "upload/";

export default {
  name: "File",
  data() {
    return {
      m_value: null,
      items: [0],
      m_file: null,
      d_file: [],
    };
  },
  methods: {
    onMapFileSelected(event) {
      this.m_file = event.target.files[0];
      this.m_value = this.m_file;
    },
    onDeviceFileSelected(data) {
      let { device_file, idx } = data;
      this.d_file[idx] = device_file;
    },
    addItem() {
      this.items.push(this.items.length);
    },
    uploadFile() {
      const formData = new FormData();
      let uploadData = [this.m_file, ...this.d_file];
      for (let i = 0; i < uploadData.length; i++) {
        formData.append("upload", uploadData[i]);
      }
      axios
        .post(BACKEND_URL, formData)
        .then((response) => {
          if (response.data.data == "OK") {
            window.alert("Successful!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    InsertDeviceGroup,
  },
};
</script>

<template>
  <div class="row justify-content-center" id="landing-container">
    <div class="col-8">
      <form
        class="files-div"
        enctype="multipart/form-data"
        @submit.prevent="uploadFile"
      >
        <div class="row">
          <div class="file-import-container col align-self-center">
            <div class="row">
              <div class="col-md-5" id="label-name">import map</div>
              <div class="col-md-4">
                <div class="row">
                  <label class="file-select">
                    <!-- We can't use a normal button element here, as it would become the target of the label. -->

                    <div class="select-button">
                      <!-- Display the filename if a file has been selected. -->
                      <span v-if="m_value">{{ m_value.name }}</span>
                      <span v-else>file .glb</span>
                    </div>
                    <!-- Now, the file input that we hide. -->
                    <input
                      type="file"
                      name="upload"
                      @change="onMapFileSelected"
                    />
                  </label>
                </div>
              </div>
            </div>
            <hr />

            <InsertDeviceGroup
              v-for="(item, index) in items"
              :key="index"
              :index="index"
              @custom-event="onDeviceFileSelected"
            />

            <div class="row btn-container">
              <div class="col-md-4"></div>
              <div class="col-md-4">
                <div class="row">
                  <button type="submit" class="save-btn">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
#landing-container {
  padding-top: 150px;
  padding-bottom: 60px;
}
.files-div {
  border-radius: 60px;
  background-color: #f3f3f3;
}
.file-select > .select-button {
  padding: 1rem;
  color: #999;
  background-color: white;
  border-radius: 1rem;
  text-align: right;
  font-weight: bold;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}

#label-name {
  text-align: right;
  padding: 20px;
  color: #666;
  font-weight: 700;
  text-transform: uppercase;
}

.file-import-container {
  padding: 100px;
}
.btn-container {
  padding: 50px;
}
button.save-btn {
  padding: 20px;
  border-radius: 1em;
  border: none;
  background-color: rgba(2, 168, 141, 0.849);
  text-transform: uppercase;
  color: white;
  font-weight: 600;
}
.insert-add-btn {
  padding: 16px;
  border: none;
  border-radius: 50%;
  background-color: white;
}
</style>
