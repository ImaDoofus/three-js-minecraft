class Settings {
	constructor(minecraftInstance) {
		this.minecraftInstance = minecraftInstance;

		this.near = 0.01;
		this.far = 100000;
		this.fov = 75;
	}

	setFov(fov) {
		this.fov = fov;
		this.minecraftInstance.camera.fov = fov;
		this.minecraftInstance.camera.updateProjectionMatrix();
	}
}

export { Settings };
