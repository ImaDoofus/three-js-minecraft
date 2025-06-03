import type { HousingWorld } from "../world/World.ts";
import { Block } from "./Block";
import { BlockFace, type TextureCoords } from "./BlockFace";
import { BlockFaceGeometry } from "./BlockFaceGeometry";

export class BlockGrass extends Block {
	constructor(
		public id: number,
		public name: string,
	) {
		super(id, name);
		this.isOpaqueCube = true;
	}

	setTopFace(uvCoords: TextureCoords): this {
		this.faces.push(new BlockFace(BlockFaceGeometry.TOP, uvCoords, true, true));
		return this;
	}

	// TODO: fix calculation?
	getColorMultiplier(
		world: HousingWorld,
		x: number,
		y: number,
		z: number,
	): [number, number, number] {
		return world.getGrassColorAtPosition(x, y, z);
	}
}
