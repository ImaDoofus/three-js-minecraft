import {
	WebGLRenderer,
	Clock,
	PerspectiveCamera,
	Scene,
	AxesHelper,
	DirectionalLight,
	AmbientLight,
	SRGBColorSpace,
  Vector3,
} from "three";
import { Settings } from "../settings/Settings";
import { Sky } from "../world/sky/Sky";
import { HousingWorld } from "../world/World";
import { Reticle } from "../reticle/Reticle";
import { MinecraftControls } from "../controls/MinecraftControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BlockRegistry } from "../block/BlockRegistry";
import { Hologram } from "../entities/Hologram.ts";
import { FloatingText } from "../entities/FloatingText.ts";

// TODO: there is an issue with "fireflies" rendering artifacts

class Minecraft {
	private settings!: Settings;
	private renderer!: WebGLRenderer;
	private sky!: Sky;
	private tickInterval!: number;
	private reticle!: Reticle;
	private clock!: Clock;

	public camera!: PerspectiveCamera;
	public controls!: MinecraftControls | OrbitControls;
	public scene!: Scene;
	public world!: HousingWorld;

	public holograms: Hologram[] = [];

	constructor(
		private canvas: HTMLCanvasElement,
		private isMobile = false,
	) {
		this._init();

		// start tick loop
		const tps = 20;
		this.tickInterval = setInterval(this.tick.bind(this), 1000 / tps);

		// start render loop
		this.render();
	}

	private _init() {
		BlockRegistry.registerBlocks();

		this.settings = new Settings(this);

		this.camera = new PerspectiveCamera(
			this.settings.fov,
			1,
			this.settings.near,
			this.settings.far,
		);
		this.renderer = new WebGLRenderer({ canvas: this.canvas });
		this.renderer.outputColorSpace = SRGBColorSpace;
		// this.renderer.antialias = true;

		this.scene = new Scene();
		const axesHelper = new AxesHelper(5);
		this.scene.add(axesHelper);

		// Example usage of controls, pick one:
		if (this.isMobile) {
			this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		} else {
			this.controls = new MinecraftControls(this.camera, this.canvas);

			this.canvas.addEventListener("click", () => {
				if (!this.controls.isLocked) this.controls.lock();
			});
		}
		// this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		// this.controls.enableDamping = true;
		// this.controls = new FlyControls(this.camera, this.renderer.domElement);
		// this.controls.movementSpeed = 10;
		// this.controls.domElement = this.renderer.domElement;
		// this.controls.rollSpeed = Math.PI / 24;
		// this.controls.autoForward = false;
		// this.controls.dragToLook = true;

		this.camera.position.set(50, 5, 50);
		this.camera.lookAt(0, 0, 0);
		this.clock = new Clock(true);
		// Optional controls lock on mousedown
		// this.canvas.addEventListener("mousedown", () => {
		//   if (!this.controls.isLocked) this.controls.lock();
		// });

		this.world = new HousingWorld(this);

		this.sky = new Sky();
		this.sky.scale.setScalar(this.settings.far / 2);
		this.scene.add(this.sky);

		// this.scene.add(new AxesHelper(1000));

		this.reticle = new Reticle();
		this.reticle.position.set(0, 0, -this.settings.near * 5);
		this.camera.add(this.reticle);
		this.scene.add(this.camera);

		this.setupLights();
	}

	private setupLights() {
		// const ambientLight = new AmbientLight(0xcccccc, 3);
		// this.scene.add(ambientLight)

		// const dl = new DirectionalLight(0xffffff, 0.5)
		// dl.position.set(1, 1, 0.5).normalize()
		// dl.castShadow = true
		// this.scene.add(dl)
	}

	private render() {
		if (this.isMobile) {
			this.controls.update();
		} else {
			this.controls.update(this.clock.getDelta());
		}
		this.renderer.render(this.scene, this.camera);

		requestAnimationFrame(this.render.bind(this));
	}

	private tick() {
		for (const hologram of this.holograms) {
			for (const line of hologram.children) {
				line.rotation.copy(this.camera.rotation);
			}
		}
	}

	public dispose() {
		clearInterval(this.tickInterval);
		if (this.isMobile) {
			this.controls.disconnect();
		}
	}

	public resize() {
		const parent = this.canvas.parentElement!;
		const width = parent.clientWidth;
		const height = parent.clientHeight;

		this.renderer.setSize(width, height);
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	}

	public syncControls(other: Minecraft) {
		if (this.isMobile) {
			this.controls.addEventListener("change", () => {
				other.controls.target.copy(this.controls.target);
				other.controls.object.position.copy(this.controls.object.position);
			});
			other.controls.addEventListener("change", () => {
				this.controls.target.copy(other.controls.target);
				this.controls.object.position.copy(other.controls.object.position);
			});
		} else {
			this.controls.sync(other.controls);
			other.controls.sync(this.controls);
		}
	}

	public spawnHologram(blockPosition: Vector3): Hologram {
		const hologram = new Hologram(this, blockPosition);
		this.holograms.push(hologram);
		this.scene.add(hologram);
		return hologram;
	}

	public removeHologram(hologram: Hologram) {
		console.log("Removing hologram", hologram);
		const index = this.holograms.indexOf(hologram);
		if (index !== -1) {
			this.holograms.splice(index, 1);
			this.scene.remove(hologram);
		}
	}
}

export { Minecraft };
