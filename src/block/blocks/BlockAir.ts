import { Block } from "../Block";

class BlockAir extends Block {
	constructor() {
		super();
	}
}

Block.registerBlock(0, "air", new BlockAir());