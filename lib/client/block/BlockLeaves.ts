import type { HousingWorld } from "../world/World";
import { Block } from "./Block";
import { BlockFace, type TextureCoords } from "./BlockFace";
import { BlockFaceGeometry } from "./BlockFaceGeometry";
import { BlockTransparent } from "./BlockTransparent";

export class BlockLeaves extends BlockTransparent {
	private colorOverride: [number, number, number] | null = null;

	constructor(
		public id: number,
		public name: string,
	) {
		super(id, name);
	}

	setColorOverride(r: number, g: number, b: number): this {
		this.colorOverride = [r, g, b];
		return this;
	}

	setTopFace(uvCoords: TextureCoords): this {
		this.faces.push(new BlockFace(BlockFaceGeometry.TOP, uvCoords, true, true));
		return this;
	}

	setBottomFace(uvCoords: TextureCoords): this {
		this.faces.push(
			new BlockFace(BlockFaceGeometry.BOTTOM, uvCoords, true, true),
		);
		return this;
	}

	setEastFace(uvCoords: TextureCoords): this {
		this.faces.push(
			new BlockFace(BlockFaceGeometry.EAST, uvCoords, true, true),
		);
		return this;
	}

	setWestFace(uvCoords: TextureCoords): this {
		this.faces.push(
			new BlockFace(BlockFaceGeometry.WEST, uvCoords, true, true),
		);
		return this;
	}

	setSouthFace(uvCoords: TextureCoords): this {
		this.faces.push(
			new BlockFace(BlockFaceGeometry.SOUTH, uvCoords, true, true),
		);
		return this;
	}

	setNorthFace(uvCoords: TextureCoords): this {
		this.faces.push(
			new BlockFace(BlockFaceGeometry.NORTH, uvCoords, true, true),
		);
		return this;
	}

	getColorMultiplier(
		world: HousingWorld,
		x: number,
		y: number,
		z: number,
	): [number, number, number] {
		if (this.colorOverride) {
			return this.colorOverride;
		}

		const COLOR = world.getFoliageColorAtPosition(x, y, z);
		return COLOR;
	}
}
