import {
	BackSide,
	BoxGeometry,
	Mesh,
	RawShaderMaterial,
	UniformsUtils,
	Vector3,
} from "three";

// fetch shaders using vite syntax
import vertexShader from "./shaders/overworld.vert.glsl?raw";
import fragmentShader from "./shaders/overworld.frag.glsl?raw";

interface SkyShader {
	uniforms: {
		topColor: { value: Vector3 };
		bottomColor: { value: Vector3 };
		offset: { value: number };
		exponent: { value: number };
	};
}

class Sky extends Mesh {
	public isSky: boolean;

	constructor() {
		const shader: SkyShader = Sky.SkyShader;

		const material = new RawShaderMaterial({
			fragmentShader,
			vertexShader,
			name: "SkyShader",
			uniforms: UniformsUtils.clone(shader.uniforms),
			side: BackSide,
			depthWrite: false,
		});

		super(new BoxGeometry(1, 1, 1), material);

		this.isSky = true;
	}

	static SkyShader: SkyShader = {
		uniforms: {
			topColor: { value: new Vector3(124 / 255, 165 / 255, 255 / 255) },
			bottomColor: { value: new Vector3(183 / 255, 209 / 255, 255 / 255) },
			offset: { value: 1.0 },
			exponent: { value: 20.0 },
		},
	};
}

export { Sky };
