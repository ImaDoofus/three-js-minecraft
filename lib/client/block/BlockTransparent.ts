import { Block } from "./Block";

export class BlockTransparent extends Block {
	constructor(
		public id: number,
		public name: string,
	) {
		super(id, name);
		this.isOpaqueCube = false;
	}
}
