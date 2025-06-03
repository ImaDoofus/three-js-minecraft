// Needs vite-plugin-node-polyfills

import { parse } from "prismarine-nbt";
// import { Buffer } from "buffer";
import validSetBlocks from "./valid_set_blocks.json";

interface BlockMap {
	[id: number]: {
		[meta: number]: number;
	};
}

interface ParsedSchematic {
	width: number;
	height: number;
	length: number;
	blocks: number[];
}

const blockMap: BlockMap = {};
for (const block of validSetBlocks) {
	if (!blockMap[block.id]) blockMap[block.id] = {};
	blockMap[block.id][block.meta] = block.cid;
}

export async function parseSchematic(
	readerResult: ArrayBuffer,
): Promise<ParsedSchematic> {
	const { parsed } = await parse(Buffer.from(readerResult));
	console.log(parsed);

	const value = parsed.value;
	const width = value.Width.value as number;
	const height = value.Height.value as number;
	const length = value.Length.value as number;

	const blocks = value.Blocks.value as number[];
	const meta = value.Data.value as number[];

	const customIds: number[] = blocks.map((block, i) => {
		const variant = stripUnusedMetadata(block, meta[i]);
		if (block < 0) block += 256;
		return blockMap[block]?.[variant] ?? 0;
	});

	return { width, height, length, blocks: customIds };
}

function stripUnusedMetadata(block: number, meta: number): number {
	switch (block) {
		case 17: // logs
		case 18: // leaves
		case 155: // quartz block
			return meta & 0x0011;
		case 29: // sticky piston
		case 33: // piston
			return meta & 0x0000;
		case 44: // slab
		case 126: // wood slab
			return meta & 0x0111;
		case 161: // leaves2
		case 162: // logs2
			return meta & 0x0001;
		case 23: // dispenser
		case 53: // stairs
		case 61: // furnace
		case 67: // cobblestone stairs
		case 86: // pumpkin
		case 91: // jack o lantern
		case 108: // brick stairs
		case 109: // stone brick stairs
		case 114: // nether brick stairs
		case 120: // end portal frame
		case 128: // sandstone stairs
		case 134: // spruce wood stairs
		case 135: // birch wood stairs
		case 136: // jungle wood stairs
		case 156: // quartz stairs
		case 158: // dropper
		case 163: // acacia wood stairs
		case 164: // dark oak wood stairs
		case 170: // hay bale
		case 180: // red sandstone stairs
		case 182: // red sandstone slab
			return 0;
		default:
			return meta;
	}

	// switch (block) {
	// 	case 17: // logs
	// 		return meta & 0x0011;
	// 	case 18: // leaves
	// 		return meta & 0x0011;
	// 	case 23: // dispenser
	// 		return 0;
	// 	case 29: // sticky piston
	// 		return meta & 0x0000;
	// 	case 33: // piston
	// 		return meta & 0x0000;
	// 	case 44: // slab
	// 		return meta & 0x0111;
	// 	case 53: // stairs
	// 		return 0;
	// 	case 61: // furnace
	// 		return 0;
	// 	case 67: // cobblestone stairs
	// 		return 0;
	// 	case 86: // pumpkin
	// 		return 0;
	// 	case 91: // jack o lantern
	// 		return 0;
	// 	case 108: // brick stairs
	// 		return 0;
	// 	case 109: // stone brick stairs
	// 		return 0;
	// 	case 114: // nether brick stairs
	// 		return 0;
	// 	case 120: // end portal frame
	// 		return 0;
	// 	case 126: // wood slab
	// 		return meta & 0x0111;
	// 	case 128: // sandstone stairs
	// 		return 0;
	// 	case 134: // spruce wood stairs
	// 		return 0;
	// 	case 135: // birch wood stairs
	// 		return 0;
	// 	case 136: // jungle wood stairs
	// 		return 0;
	// 	case 155: // quartz block
	// 		return meta & 0x0011;
	// 	case 156: // quartz stairs
	// 		return 0;
	// 	case 158: // dropper
	// 		return 0;
	// 	case 161: // leaves2
	// 		return meta & 0x0001;
	// 	case 162: // logs2
	// 		return meta & 0x0001;
	// 	case 163: // acacia wood stairs
	// 		return 0;
	// 	case 164: // dark oak wood stairs
	// 		return 0;
	// 	case 170: // hay bale
	// 		return 0;
	// 	case 180: // red sandstone stairs
	// 		return 0;
	// 	case 182: // red sandstone slab
	// 		return 0;

	// 	default:
	// 		return meta;
	// }
}
