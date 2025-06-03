import { Sprite, RawShaderMaterial, UniformsUtils, DoubleSide } from "three";

// fetch shaders using vite syntax
import vertexShader from "./shaders/reticle.vert.glsl?raw";
import fragmentShader from "./shaders/reticle.frag.glsl?raw";

class Reticle extends Sprite {
	constructor() {
		const shader = Reticle.ReticleShader;

		const material = new RawShaderMaterial({
			fragmentShader,
			vertexShader,
			name: "ReticleShader",
			uniforms: UniformsUtils.clone(shader.uniforms),
			transparent: true,
			side: DoubleSide,
		});

		super(material);

		this.isReticle = true;
	}

	static ReticleShader = {
		uniforms: {
			thickness: { value: 0.0001 },
			height: { value: 0.001 },
			offset: { value: 0.0 },
			opacity: { value: 1.0 },
		},
	};
}

export { Reticle };
