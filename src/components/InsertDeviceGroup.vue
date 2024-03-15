<script>
export default {
  name: "InsertDeviceGroup",
  props: {
    index: {
      isrequired: true,
    },
  },
  data() {
    return {
      value: null,
    };
  },
  methods: {
    callParentMethod() {
      this.$parent.addItem();
    },
    handleFileChange(idx) {
      const file = event.target.files[0];
      this.value = file;
      this.$emit("custom-event", { device_file: file, idx: idx });
    },
  },
};
</script>

<template>
  <div class="row insert-group-container">
    <div class="col-md-5" id="label-name">
      <span v-if="index == 0" id="label-name">import</span>device
    </div>
    <div class="col-md-4">
      <div class="row">
        <label class="file-select">
          <!-- We can't use a normal button element here, as it would become the target of the label. -->

          <div class="select-button">
            <!-- Display the filename if a file has been selected. -->
            <span v-if="value">{{ value.name }}</span>
            <span v-else>file .glb</span>
          </div>

          <!-- Now, the file input that we hide. -->
          <input type="file" @change="handleFileChange(index)" id="{{index}}" />
        </label>
      </div>
    </div>

    <div class="col-md-2">
      <div class="insert-add-btn" @click="callParentMethod">+</div>
    </div>
  </div>
</template>

<style scoped>
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
.insert-add-btn {
  color: hsl(303, 86%, 57%);
  width: 56px;
  font-size: 48px;
  height: 56px;
  line-height: 64px;
  vertical-align: middle;
  border: none;
  line-height: 20px;
  padding: 14px 11px;
  border-radius: 50%;
  background-color: white;
  text-decoration: none;
}

#label-name {
  text-align: right;
  padding: 20px;
  color: #666;
  font-weight: 700;
  text-transform: uppercase;
}
.insert-group-container {
  padding-bottom: 20px;
}
</style>
