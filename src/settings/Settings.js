class Settings {
	constructor(minecraftInstance) {
		this.minecraftInstance = minecraftInstance;

		this.fov = 75;
		this.near = 0.01;
		this.far = 100000;
		this.width = 800;
		this.height = 600;
		this.aspect = this.width / this.height;
	}

	setFov(fov) {
		this.fov = fov;
		this.minecraftInstance.camera.fov = fov;
		this.minecraftInstance.camera.updateProjectionMatrix();
	}

	setAspect(aspect) {
		this.aspect = aspect;
		this.minecraftInstance.camera.aspect = aspect;
		this.minecraftInstance.camera.updateProjectionMatrix();
	}

	setWidth(width) {
		this.width = width;
		this.minecraftInstance.renderer.setSize(width, this.height);
	}

	setHeight(height) {
		this.height = height;
		this.minecraftInstance.renderer.setSize(this.width, height);
	}
}

export { Settings };