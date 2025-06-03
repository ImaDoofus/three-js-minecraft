import { BlockFace, type TextureCoords } from "./BlockFace";
import { BlockFaceGeometry } from "./BlockFaceGeometry";
import { BlockTransparent } from "./BlockTransparent";

// TODO: fix transparency issues
export class BlockEndPortalFrame extends BlockTransparent {
	static readonly TOP = new BlockFaceGeometry(
		"top",
		[0, 13 / 16, 0],
		[1, 13 / 16, 1],
	);

	constructor(
		public id: number,
		public name: string,
	) {
		super(id, name);
	}

	setTopFace(uvCoords: TextureCoords): this {
		const topFace = new BlockFace(BlockEndPortalFrame.TOP, uvCoords, false);
		this.faces.push(topFace);
		return this;
	}
}
