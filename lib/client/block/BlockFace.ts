import type { BlockFaceGeometry } from "./BlockFaceGeometry";

export type TextureCoords = [number, number];
type BakedUVs = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
];

export class BlockFace {
	public uvs: BakedUVs;

	constructor(
		public geometry: BlockFaceGeometry,
		uvs: TextureCoords,
		public shouldCull = true,
		public shouldTint = false,
	) {
		this.uvs = this.calculateUVs(uvs);
	}

	private calculateUVs(uvs: TextureCoords): BakedUVs {
		const SCALE = 1 / 32;
		// const SCALE = 1;
		const [u0, v0, u1, v1, u2, v2, u3, v3] = this.geometry.faceUVs;
		const [u, v] = uvs;
		// const [u, v] = [0, 0];

		return [
			(u + u0) * SCALE,
			1 - (v + 1 - v0) * SCALE,
			(u + u1) * SCALE,
			1 - (v + 1 - v1) * SCALE,
			(u + u2) * SCALE,
			1 - (v + 1 - v2) * SCALE,
			(u + u3) * SCALE,
			1 - (v + 1 - v3) * SCALE,
		];
	}
}

// TODO: SHOULD CULL ALL
