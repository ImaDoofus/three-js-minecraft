import {
	BackSide,
	BoxGeometry,
	Mesh,
	RawShaderMaterial,
	UniformsUtils,
	Vector3
} from 'three';

// fetch shaders using vite syntax
import vertexShader from './shaders/overworld.vert.glsl?raw';
import fragmentShader from './shaders/overworld.frag.glsl?raw';

class Sky extends Mesh {
	constructor() {
		const shader = Sky.SkyShader;

		const material = new RawShaderMaterial({
			fragmentShader,
			vertexShader,
			name: 'SkyShader',
			uniforms: UniformsUtils.clone(shader.uniforms),
			side: BackSide,
			depthWrite: false
		});

		super(new BoxGeometry( 1, 1, 1 ), material);

		this.isSky = true;
	}

	static SkyShader = {
		uniforms: {
			'topColor': { value: new Vector3(124/255, 165/255, 255/255) },
			'bottomColor': { value: new Vector3(183/255, 209/255, 255/255) },
			// 'topColor': { value: new Vector3(1.0, 0.0, 0.0) },
			// 'bottomColor': { value: new Vector3(0.0, 0.0, 1.0) },
			'offset': { value: 1.0 },
			'exponent': { value: 20.0 },
		},
	}
}


export { Sky };