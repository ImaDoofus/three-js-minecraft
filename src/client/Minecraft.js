import * as THREE from "three";
import { Settings } from "../settings/Settings.js";
import { Sky } from "../world/sky/Sky.js";
import { World } from "../world/World.ts";
import { Reticle } from "../gui/reticle/Reticle.js";
import { MinecraftControls } from "../controls/MinecraftControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class Minecraft {
  constructor(canvas) {
    this._version = "1.0.0";

    this.canvas = canvas;

    this._init();

    // start tick loop
    const tps = 20;
    this.tickInterval = setInterval(this._tick.bind(this), 1000 / tps);

    // start render loop
    this._render();
  }

  _init() {
    this.settings = new Settings(this);

    this.camera = new THREE.PerspectiveCamera(
      this.settings.fov,
      this.settings.aspect,
      this.settings.near,
      this.settings.far
    );
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer = renderer;
    // renderer.setPixelRatio(window.devicePixelRatio);

    this.scene = new THREE.Scene();
    // this.renderer.setSize(this.settings.width, this.settings.height);

    this.controls = new MinecraftControls(
      this.camera,
      this.renderer.domElement
    );
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.clock = new THREE.Clock();

    this.canvas.addEventListener("mousedown", () => {
      if (!this.controls.isLocked) this.controls.lock();
    });

    this.world = new World(this);

    this.sky = new Sky();
    this.sky.scale.setScalar(this.settings.far / 2);
    this.scene.add(this.sky);

    this.scene.add(new THREE.AxesHelper(1000));

    // this.reticle = new Reticle();
    // this.reticle.position.set(0, 0, -this.settings.near * 5);
    // this.camera.add(this.reticle);
    this.scene.add(this.camera);

    this._setupLights();
  }

  _setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 100, 0);
    this.scene.add(directionalLight);
  }

  _render() {
    // this.controls.update(this.clock.getDelta());
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this._render.bind(this));
  }

  _tick() {
    this.controls._tick();
  }

  dispose() {
    clearInterval(this.tickInterval);

    this.controls.dispose();
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.settings.width = parent.offsetWidth;
    this.settings.height = parent.offsetHeight;

    this.settings.aspect = this.settings.width / this.settings.height;

    this.camera.aspect = this.settings.aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.settings.width, this.settings.height);

    this.canvas.width = this.settings.width;
    this.canvas.height = this.settings.height;
  }
}

export { Minecraft };
