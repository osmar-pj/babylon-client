<script>
import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import { SceneLoader } from "babylonjs";
import "babylonjs-loaders";

export default {
  name: "BabylonScene",
  data() {
    return {
      data_url: null,
      engine: null,
      scene: null,
      pointArray: [],
      selectedIdx: -1,
      device_url: [],
      url: "",
    };
  },
  props: {
    p_url: String,
    p_device_url: Array,
    point: Array,
  },
  methods: {
    childSetSelect(idx = -1) {
      this.$emit("cu-event", idx);
    },
    async createScene(url, device_url, myFun) {
      const canvas = this.$refs["renderCanvers"];
      const destinyParent = document.getElementById("canvas-container");
      canvas.width = destinyParent?.offsetWidth;
      canvas.height = destinyParent?.offsetHeight;
      const engine = new BABYLON.Engine(canvas, true);
      var isFirst = 0; // is first time check
      var deviceMeshName = [];

      const scene = new BABYLON.Scene(engine); // Create a new scene

      scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.1); // Background color

      var h1 = new BABYLON.HighlightLayer("hl1", scene); // Create highlight layer

      // Set FrameBehavior
      var frameBehavior = new BABYLON.FramingBehavior();
      frameBehavior.defaultElevation = Math.PI / 3;
      // frameBehavior.elevationReturnTime = -1;

      // Create a new Camera
      var camera = new BABYLON.ArcRotateCamera(
        "camera",
        0,
        0,
        0,
        new BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);
      camera.addBehavior(frameBehavior);

      // Light
      const light1 = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(1, 1, 0),
        scene
      );

      // highlight
      function addHighlight(meshes) {
        h1.removeAllMeshes();
        meshes.forEach((mesh) => {
          h1.addMesh(mesh, new BABYLON.Color3.Green());
        });
      }

      // unhighlight
      function removeHighlight(meshes) {
        meshes.forEach((mesh) => {
          h1.removeMesh(mesh);
        });
      }

      // Draw GUI Panel
      var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); //Creat AdvancedDynamicTexture

      // Add Panel
      const panel = new GUI.StackPanel("myRightPanel");
      panel.width = "400px";
      panel.isVertical = true;
      panel.borderRadiusPanel = "10%";
      panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
      panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
      panel.paddingLeft = "20px";

      //add panel background color
      var rect1 = new GUI.Rectangle();
      rect1.width = 1;
      rect1.height = 1;
      rect1.cornerRadius = 20;
      rect1.background = "#fff";
      rect1.alpha = 0.5;

      // add Header -- Devices
      const header = new GUI.TextBlock();
      header.text = "Dispositivos";
      header.paddingTop = "50px";
      header.height = "100px";
      header.color = "black";
      header.fontSize = 22;

      advancedTexture.addControl(panel);
      panel.addControl(rect1);
      panel.addControl(header);

      // Draw imported devices
      let length = device_url.length;
      for (let idx = 0; idx < length; idx++) {
        myList("RP" + idx, "Device " + idx, idx, device_url[idx]);
      }

      // Import Map
      const result = await SceneLoader.ImportMeshAsync(
        "",
        url,
        "",
        scene,
        null,
        ".glb"
      );

      scene.createDefaultLight();
      scene.createDefaultEnvironment();

      let loadedmesh = result.meshes[0];
      loadedmesh.name = "mapMesh";
      loadedmesh.normalizeToUnitCube();
      loadedmesh.position = new BABYLON.Vector3.Zero();
      loadedmesh.scaling.scaleInPlace(5);
      loadedmesh.rotation = new BABYLON.Vector3(5, 3, 0); // (-1.2,0,0)
      loadedmesh.computeWorldMatrix(true);
      const boundingInfo = loadedmesh.getHierarchyBoundingVectors(true);
      const sizeVec = boundingInfo.max.subtract(boundingInfo.min);
      const halfSizeVec = sizeVec.scale(0.5); // ubication of device
      const center = boundingInfo.min.add(halfSizeVec);
      const Ybottom = sizeVec.scale(0);
      loadedmesh.position = center.scale(-1); // -1
      loadedmesh.position.y += halfSizeVec.y;
      loadedmesh.computeWorldMatrix(true);
      camera.setTarget(result.meshes[1]);
      loadedmesh.getDescendants().forEach(function (mesh) {
        mesh.material.albedoColor = new BABYLON.Color3(0.6, 0.6, 0.6); // Color of map
      });

      /**
       * List Function
       * @param {*} p_title Icon title
       * @param {*} p_title2 Icon title2
       * @param {*} idx index
       * @param {*} p_url url of device
       */
      function myList(p_title, p_title2, idx, p_url) {
        let title1 = new GUI.TextBlock();
        let title2 = new GUI.TextBlock();
        let rect1 = new GUI.Rectangle();
        let btn = GUI.Button.CreateSimpleButton("btn", p_title2);
        let grid = new GUI.Grid();
        let isFlag = false;
        grid.paddingBottom = "5px";
        grid.addColumnDefinition(0.6);
        grid.addColumnDefinition(0.4);
        grid.height = "120px";
        panel.addControl(grid);
        title1.text = p_title;
        rect1.width = 0.9;
        rect1.height = 0.8;
        rect1.horizontalAlignment = 1;
        rect1.color = "white";
        rect1.addControl(title1);
        title2.text = p_title2;
        btn.width = 0.85;
        btn.height = 0.8;
        btn.color = "green";
        btn.background = "yellow";
        btn.horizontalAlignment = 0;

        //When click add
        btn.onPointerClickObservable.add(() => {
          if (!isFlag) {
            isFlag = true;
            var parentMesh = BABYLON.Mesh.CreateBox("parentMesh", 0, scene);
            parentMesh.isVisible = false;
            SceneLoader.ImportMesh(
              "",
              p_url,
              "",
              scene,
              (meshes) => {
                meshes.forEach((mesh) => {
                  if (mesh.name != "__root__") deviceMeshName.push(mesh.name)
                  mesh.isPickable = true
                  mesh.idx = idx // identificamos el idx del dispositivo
                  mesh.setParent(parentMesh)
                  parentMesh.position.x = 0.3 * (idx + 1)
                  parentMesh.position.y = 0.3
                  parentMesh.position.z = -1
                  parentMesh.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)
                  mesh.actionManager = new BABYLON.ActionManager(scene)
                })
              },
              null,
              null,
              ".glb"
            )
          }
        });
        grid.addControl(rect1, 0, 0);
        grid.addControl(btn, 0, 1);
      }

      /// transform of model.
      var startingPoint;
      var currentMesh;
      var getGroundPosition = function () {
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY);
        if (pickinfo.hit) {
          return pickinfo.pickedPoint;
        }
        return null;
      };

      var pointerDown = function (mesh) {
        if (mesh && mesh.name && deviceMeshName.includes(mesh.name))
          if (mesh.parent instanceof BABYLON.Mesh) {
            currentMesh = mesh.parent;
            myFun(mesh.idx);
            addHighlight(currentMesh.getChildMeshes());
            startingPoint = getGroundPosition();
            if (startingPoint) {
              // we need to disconnect camera from canvas
              setTimeout(function () {
                camera.detachControl(canvas);
              }, 0);
            }
          }
      };

      var pointerUp = function () {
        if (startingPoint) {
          camera.attachControl(canvas, true);
          startingPoint = null;
          return;
        }
      };

      var pointerMove = function () {
        if (currentMesh) {
          if (!startingPoint) {
            return;
          }
          requestAnimationFrame(function () {
            var currentPoint = getGroundPosition();

            if (!currentPoint) {
              return;
            }

            var diff = currentPoint.subtract(startingPoint);
            currentMesh.position.addInPlace(diff);
            startingPoint = currentPoint;
            // console.log(currentMesh.position)
          });
        }
      };

      scene.onPointerObservable.add((pointerInfo) => {
        // console.log(pointerInfo)
        switch (pointerInfo.type) {
          case BABYLON.PointerEventTypes.POINTERDOWN:
            pointerDown(pointerInfo.pickInfo.pickedMesh);
            break;
          case BABYLON.PointerEventTypes.POINTERUP:
            pointerUp();
            break;
          case BABYLON.PointerEventTypes.POINTERMOVE:
            pointerMove();
            break;
        }
      });

      scene.registerBeforeRender(() => {
        if (isFirst < 2) {
          isFirst++;
          camera.alpha = 0.5 * Math.PI;
          camera.beta = 0.8 * Math.PI;
        }
      });

      engine.runRenderLoop(() => {
        var path = this.$route.path;
        var myPanel = advancedTexture.getControlByName("myRightPanel");
        if (path == "/analysis") {
          myPanel.isVisible = false;
        } else {
          myPanel.isVisible = true;
        }
        scene.render();
      });

      scene.onPointerDown = () => {
        h1.removeAllMeshes();
        myFun();
      };

      return { engine, scene };
    },
  },
  async mounted() {
    this.url = this.p_url;
    this.device_url = this.p_device_url;
    const { engine, scene } = await this.createScene(
      this.url,
      this.device_url,
      this.childSetSelect
    );

    // Resize canvas on window resize
    this.engine = engine;
    this.scene = scene;
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  },
  beforeDestroy() {
    // Dispose resources when component is destroyed
    this.engine.dispose();
    this.scene.dispose();
  },
};
</script>

<template>
  <div class="canvas-container" id="canvas-container">
    <canvas ref="renderCanvers" id="renderCanvers"></canvas>
  </div>
</template>

<style scoped>
.canvas-container {
  width: 100vw;
  height: 100vh;
  z-index: -1;
  padding: 0px !important;
}

#renderCanvers {
  padding: 0px !important;
}
</style>
