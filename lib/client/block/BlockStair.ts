import { BlockFace, type TextureCoords } from "./BlockFace";
import { BlockFaceGeometry } from "./BlockFaceGeometry";
import { BlockTransparent } from "./BlockTransparent";

export class BlockStair extends BlockTransparent {
	static readonly WEST_LOWER = new BlockFaceGeometry(
		"west",
		[0, 0, 0],
		[0, 0.5, 1],
	);
	static readonly WEST_UPPER = new BlockFaceGeometry(
		"west",
		[0.5, 0.5, 0],
		[0.5, 1, 1],
	);

	static readonly EAST = new BlockFaceGeometry("east", [1, 0, 0], [1, 1, 1]);

	static readonly SOUTH_LOWER = new BlockFaceGeometry(
		"south",
		[0, 0, 1],
		[1, 0.5, 1],
	);
	static readonly SOUTH_UPPER = new BlockFaceGeometry(
		"south",
		[0.5, 0.5, 1],
		[1, 1, 1],
	);

	static readonly NORTH_LOWER = new BlockFaceGeometry(
		"north",
		[0, 0, 0],
		[1, 0.5, 0],
	);
	static readonly NORTH_UPPER = new BlockFaceGeometry(
		"north",
		[0.5, 0.5, 0],
		[1, 1, 0],
	);

	static readonly TOP_LOWER = new BlockFaceGeometry(
		"top",
		[0, 0.5, 0],
		[0.5, 0.5, 1],
	);
	static readonly TOP_UPPER = new BlockFaceGeometry(
		"top",
		[0.5, 1, 0],
		[1, 1, 1],
	);

	static readonly BOTTOM = new BlockFaceGeometry(
		"bottom",
		[0, 0, 0],
		[1, 0, 1],
	);

	constructor(
		public id: number,
		public name: string,
	) {
		super(id, name);
	}

	setTopFace(uvCoords: TextureCoords): this {
		const topFace1 = new BlockFace(BlockStair.TOP_LOWER, uvCoords, false);
		const topFace2 = new BlockFace(BlockStair.TOP_UPPER, uvCoords);
		this.faces.push(topFace1);
		this.faces.push(topFace2);
		return this;
	}

	setBottomFace(uvCoords: TextureCoords): this {
		const bottomFace = new BlockFace(BlockStair.BOTTOM, uvCoords);
		this.faces.push(bottomFace);
		return this;
	}

	setSideFaces(uvCoords: TextureCoords): this {
		this.faces.push(new BlockFace(BlockStair.EAST, uvCoords));
		this.faces.push(new BlockFace(BlockStair.WEST_LOWER, uvCoords));
		this.faces.push(new BlockFace(BlockStair.WEST_UPPER, uvCoords, false));
		this.faces.push(new BlockFace(BlockStair.SOUTH_LOWER, uvCoords));
		this.faces.push(new BlockFace(BlockStair.SOUTH_UPPER, uvCoords));
		this.faces.push(new BlockFace(BlockStair.NORTH_LOWER, uvCoords));
		this.faces.push(new BlockFace(BlockStair.NORTH_UPPER, uvCoords));
		return this;
	}

	setAllFaces(uvCoords: TextureCoords): this {
		this.setTopFace(uvCoords);
		this.setBottomFace(uvCoords);
		this.setSideFaces(uvCoords);
		return this;
	}
}
