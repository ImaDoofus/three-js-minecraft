import { BlockFace, type TextureCoords } from "./BlockFace";
import { BlockFaceGeometry } from "./BlockFaceGeometry";
import { BlockTransparent } from "./BlockTransparent";

export class BlockSlab extends BlockTransparent {
	static readonly TOP = new BlockFaceGeometry("top", [0, 0.5, 0], [1, 0.5, 1]);
	static readonly EAST = new BlockFaceGeometry("east", [1, 0, 0], [1, 0.5, 1]);
	static readonly WEST = new BlockFaceGeometry("west", [0, 0, 0], [0, 0.5, 1]);
	static readonly SOUTH = new BlockFaceGeometry(
		"south",
		[0, 0, 1],
		[1, 0.5, 1],
	);
	static readonly NORTH = new BlockFaceGeometry(
		"north",
		[0, 0, 0],
		[1, 0.5, 0],
	);

	constructor(
		public id: number,
		public name: string,
	) {
		super(id, name);
	}

	setTopFace(uvCoords: TextureCoords): this {
		const topFace = new BlockFace(BlockSlab.TOP, uvCoords, false);
		this.faces.push(topFace);
		return this;
	}

	setBottomFace(uvCoords: TextureCoords): this {
		const bottomFace = new BlockFace(BlockFaceGeometry.BOTTOM, uvCoords);
		this.faces.push(bottomFace);
		return this;
	}

	setSideFaces(uvCoords: TextureCoords): this {
		this.faces.push(new BlockFace(BlockSlab.EAST, uvCoords));
		this.faces.push(new BlockFace(BlockSlab.WEST, uvCoords));
		this.faces.push(new BlockFace(BlockSlab.SOUTH, uvCoords));
		this.faces.push(new BlockFace(BlockSlab.NORTH, uvCoords));
		return this;
	}

	setAllFaces(uvCoords: TextureCoords): this {
		this.setTopFace(uvCoords);
		this.setBottomFace(uvCoords);
		this.setSideFaces(uvCoords);
		return this;
	}
}
