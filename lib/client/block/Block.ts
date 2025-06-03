import type { HousingWorld } from "../world/World";
import { BlockFace, type TextureCoords } from "./BlockFace";
import { BlockFaceGeometry } from "./BlockFaceGeometry";

export class Block {
	static readonly MISSING_TEXTURE = [25, 18] as TextureCoords;

	public faces: Array<BlockFace> = [];
	public isOpaqueCube = true;

	constructor(
		public id: number,
		public name: string,
	) {}

	getColorMultiplier(
		world: HousingWorld,
		x: number,
		y: number,
		z: number,
	): [number, number, number] {
		return [1, 1, 1];
	}

	setTopFace(uvCoords: TextureCoords): this {
		this.faces.push(new BlockFace(BlockFaceGeometry.TOP, uvCoords));
		return this;
	}

	setBottomFace(uvCoords: TextureCoords): this {
		this.faces.push(new BlockFace(BlockFaceGeometry.BOTTOM, uvCoords));
		return this;
	}

	setEastFace(uvCoords: TextureCoords): this {
		this.faces.push(new BlockFace(BlockFaceGeometry.EAST, uvCoords));
		return this;
	}

	setWestFace(uvCoords: TextureCoords): this {
		this.faces.push(new BlockFace(BlockFaceGeometry.WEST, uvCoords));
		return this;
	}

	setSouthFace(uvCoords: TextureCoords): this {
		this.faces.push(new BlockFace(BlockFaceGeometry.SOUTH, uvCoords));
		return this;
	}

	setNorthFace(uvCoords: TextureCoords): this {
		this.faces.push(new BlockFace(BlockFaceGeometry.NORTH, uvCoords));
		return this;
	}

	setAllFaces(uvCoords: TextureCoords): this {
		this.setTopFace(uvCoords);
		this.setBottomFace(uvCoords);
		this.setEastFace(uvCoords);
		this.setWestFace(uvCoords);
		this.setSouthFace(uvCoords);
		this.setNorthFace(uvCoords);
		return this;
	}

	setSideFaces(uvCoords: TextureCoords): this {
		this.setEastFace(uvCoords);
		this.setWestFace(uvCoords);
		this.setSouthFace(uvCoords);
		this.setNorthFace(uvCoords);
		return this;
	}
}
