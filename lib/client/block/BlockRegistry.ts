import { RegistryNamespaced } from "../util/registry/RegistryNamespaced";
import { Block } from "./Block";
import { BlockSlab } from "./BlockSlab";
import { BlockGrass } from "./BlockGrass";
import { BlockTransparent } from "./BlockTransparent";
import { BlockLeaves } from "./BlockLeaves";
import { BlockStair } from "./BlockStair";
import { BlockEndPortalFrame } from "./BlockEndPortalFrame";
import type { TextureCoords } from "./BlockFace";

export class BlockRegistry {
	static readonly MISSING_TEXTURE = [25, 18] as TextureCoords;
	static readonly REGISTRY = new RegistryNamespaced<string, Block>();

	static registerBlocks() {
		const blocks = [
			new BlockTransparent(0, "air"),
			new Block(1, "stone").setAllFaces([20, 9]),
			new Block(2, "granite").setAllFaces([20, 14]),
			new Block(3, "polished_granite").setAllFaces([20, 15]),
			new Block(4, "diorite").setAllFaces([20, 12]),
			new Block(5, "polished_diorite").setAllFaces([20, 13]),
			new Block(6, "andesite").setAllFaces([20, 10]),
			new Block(7, "polished_andesite").setAllFaces([20, 11]),
			new BlockGrass(8, "grass_block")
				.setTopFace([15, 10])
				.setBottomFace([8, 6])
				.setSideFaces([12, 10]),
			new Block(9, "dirt").setAllFaces([8, 6]),
			new Block(10, "coarse_dirt").setAllFaces([2, 5]),
			new Block(11, "podzol")
				.setTopFace([9, 0])
				.setBottomFace([8, 6])
				.setSideFaces([8, 7]),
			new Block(12, "cobblestone").setAllFaces([3, 5]),
			new Block(13, "oak_planks").setAllFaces([16, 4]),
			new Block(14, "spruce_planks").setAllFaces([16, 5]),
			new Block(15, "birch_planks").setAllFaces([16, 2]),
			new Block(16, "jungle_planks").setAllFaces([16, 3]),
			new Block(17, "acacia_planks").setAllFaces([16, 0]),
			new Block(18, "dark_oak_planks").setAllFaces([16, 1]),
			new Block(19, "bedrock").setAllFaces([4, 3]),
			new Block(20, "sand").setAllFaces([19, 7]),
			new Block(21, "red_sand").setAllFaces([18, 4]),
			new Block(22, "gravel").setAllFaces([0, 11]),
			new Block(23, "gold_ore").setAllFaces([11, 10]),
			new Block(24, "iron_ore").setAllFaces([11, 12]),
			new Block(25, "coal_ore").setAllFaces([0, 5]),
			new Block(26, "oak_log")
				.setTopFace([4, 14])
				.setBottomFace([4, 14])
				.setSideFaces([3, 14]),
			new Block(27, "spruce_log")
				.setTopFace([6, 14])
				.setBottomFace([6, 14])
				.setSideFaces([5, 14]),
			new Block(28, "birch_log")
				.setTopFace([0, 14])
				.setBottomFace([0, 14])
				.setSideFaces([15, 13]),
			new Block(29, "jungle_log")
				.setTopFace([2, 14])
				.setBottomFace([2, 14])
				.setSideFaces([1, 14]),
			new BlockLeaves(30, "oak_leaves").setAllFaces([4, 13]),
			new BlockLeaves(31, "spruce_leaves")
				.setAllFaces([9, 13])
				.setColorOverride(97 / 255, 153 / 255, 97 / 255),
			new BlockLeaves(32, "birch_leaves")
				.setAllFaces([5, 13])
				.setColorOverride(128 / 255, 167 / 255, 85 / 255),
			new BlockLeaves(33, "jungle_leaves").setAllFaces([7, 13]),
			new Block(34, "sponge").setAllFaces([20, 7]),
			new Block(35, "wet_sponge").setAllFaces([20, 8]),
			new BlockTransparent(36, "glass").setAllFaces([7, 8]),
			new Block(37, "lapis_ore").setAllFaces([2, 13]),
			new Block(38, "lapis_block").setAllFaces([1, 13]),
			new Block(39, "dispenser")
				.setSouthFace([9, 1])
				.setNorthFace([5, 8])
				.setTopFace([6, 8])
				.setBottomFace([6, 8])
				.setEastFace([5, 8])
				.setWestFace([5, 8]),
			new Block(40, "sandstone")
				.setTopFace([19, 12])
				.setBottomFace([19, 8])
				.setSideFaces([19, 10]),
			new Block(41, "chiseled_sandstone")
				.setTopFace([19, 12])
				.setBottomFace([19, 12])
				.setSideFaces([19, 9]),
			new Block(42, "smooth_sandstone")
				.setTopFace([19, 12])
				.setBottomFace([19, 12])
				.setSideFaces([19, 11]),
			new Block(43, "note_block").setAllFaces([14, 12]),

			new Block(44, "sticky_piston")
				.setTopFace([15, 15])
				.setBottomFace([11, 15])
				.setSideFaces([13, 15]),
			new Block(45, "piston")
				.setTopFace([14, 15])
				.setBottomFace([11, 15])
				.setSideFaces([13, 15]),

			new Block(46, "white_wool").setAllFaces([23, 8]),
			new Block(47, "orange_wool").setAllFaces([23, 3]),
			new Block(48, "magenta_wool").setAllFaces([23, 2]),
			new Block(49, "light_blue_wool").setAllFaces([23, 0]),
			new Block(50, "yellow_wool").setAllFaces([23, 9]),
			new Block(51, "lime_wool").setAllFaces([23, 1]),
			new Block(52, "pink_wool").setAllFaces([23, 4]),
			new Block(53, "gray_wool").setAllFaces([22, 14]),
			new Block(54, "light_gray_wool").setAllFaces([23, 7]),
			new Block(55, "cyan_wool").setAllFaces([22, 13]),
			new Block(56, "purple_wool").setAllFaces([23, 5]),
			new Block(57, "blue_wool").setAllFaces([22, 11]),
			new Block(58, "brown_wool").setAllFaces([22, 13]),
			new Block(59, "green_wool").setAllFaces([22, 15]),
			new Block(60, "red_wool").setAllFaces([23, 6]),
			new Block(61, "black_wool").setAllFaces([22, 10]),
			new Block(62, "gold_block").setAllFaces([10, 10]),
			new Block(63, "iron_block").setAllFaces([10, 12]),

			// TODO: slabs
			new BlockSlab(64, "stone_slab").setAllFaces([21, 1]),
			new BlockSlab(65, "sandstone_slab").setAllFaces([19, 10]),
			new BlockSlab(66, "cobblestone_slab").setAllFaces([3, 5]),
			new BlockSlab(67, "brick_slab").setAllFaces([5, 3]),
			new BlockSlab(68, "stone_brick_slab").setAllFaces([21, 1]),
			new BlockSlab(69, "nether_brick_slab").setAllFaces([4, 15]),
			new BlockSlab(70, "quartz_slab").setAllFaces([17, 4]),
			new Block(71, "bricks").setAllFaces([5, 3]),
			new Block(72, "bookshelf")
				.setAllFaces([5, 0])
				.setTopFace([16, 4])
				.setBottomFace([16, 4]),
			new Block(73, "moss_stone").setAllFaces([4, 5]),
			new Block(74, "obsidian").setAllFaces([13, 4]),
			// TODO: stairs
			new BlockStair(75, "oak_stairs").setAllFaces([16, 4]),
			new Block(76, "diamond_ore").setAllFaces([8, 5]),
			new Block(77, "diamond_block").setAllFaces([8, 4]),
			new Block(78, "crafting_table")
				.setTopFace([5, 6])
				.setBottomFace([16, 4])
				.setSouthFace([4, 6])
				.setNorthFace([3, 6])
				.setEastFace([4, 6])
				.setWestFace([3, 6]),
			new Block(79, "furnace")
				.setSouthFace([3, 8])
				.setTopFace([6, 8])
				.setBottomFace([6, 8])
				.setEastFace([5, 8])
				.setWestFace([5, 8])
				.setNorthFace([5, 8]),
			new BlockStair(80, "cobblestone_stairs").setAllFaces([3, 5]),
			new Block(81, "redstone_ore").setAllFaces([19, 1]),
			new BlockTransparent(82, "ice").setAllFaces([7, 12]),
			new Block(83, "snow_block").setAllFaces([20, 5]),
			new Block(84, "clay").setAllFaces([7, 4]),
			new Block(85, "pumpkin")
				.setSouthFace([16, 14])
				.setTopFace([17, 3])
				.setBottomFace([17, 3])
				.setEastFace([17, 0])
				.setWestFace([17, 0])
				.setNorthFace([17, 0]),
			new Block(86, "netherrack").setAllFaces([8, 15]),
			new Block(87, "soul_sand").setAllFaces([20, 6]),
			new Block(88, "glowstone").setAllFaces([9, 10]),
			new Block(89, "jack_o_lantern")
				.setSouthFace([16, 15])
				.setTopFace([17, 3])
				.setBottomFace([17, 3])
				.setEastFace([17, 0])
				.setWestFace([17, 0])
				.setNorthFace([17, 0]),
			new BlockTransparent(90, "white_stained_glass").setAllFaces([7, 10]),
			new BlockTransparent(91, "orange_stained_glass").setAllFaces([1, 9]),
			new BlockTransparent(92, "magenta_stained_glass").setAllFaces([0, 9]),
			new BlockTransparent(93, "light_blue_stained_glass").setAllFaces([14, 8]),
			new BlockTransparent(94, "yellow_stained_glass").setAllFaces([8, 10]),
			new BlockTransparent(95, "lime_stained_glass").setAllFaces([15, 8]),
			new BlockTransparent(96, "pink_stained_glass").setAllFaces([3, 10]),
			new BlockTransparent(97, "gray_stained_glass").setAllFaces([12, 8]),
			new BlockTransparent(98, "light_gray_stained_glass").setAllFaces([6, 10]),
			new BlockTransparent(99, "cyan_stained_glass").setAllFaces([14, 8]),
			new BlockTransparent(100, "purple_stained_glass").setAllFaces([4, 10]),
			new BlockTransparent(101, "blue_stained_glass").setAllFaces([9, 8]),
			new BlockTransparent(102, "brown_stained_glass").setAllFaces([10, 8]),
			new BlockTransparent(103, "green_stained_glass").setAllFaces([13, 8]),
			new BlockTransparent(104, "red_stained_glass").setAllFaces([5, 10]),
			new BlockTransparent(105, "black_stained_glass").setAllFaces([8, 8]),
			new Block(106, "stone_bricks").setAllFaces([21, 2]),
			new Block(107, "mossy_stone_bricks").setAllFaces([21, 5]),
			new Block(108, "cracked_stone_bricks").setAllFaces([21, 4]),
			new Block(109, "chiseled_stone_bricks").setAllFaces([21, 3]),
			new Block(110, "melon_block")
				.setTopFace([10, 14])
				.setBottomFace([10, 14])
				.setSideFaces([7, 14]),
			new BlockStair(111, "brick_stairs").setAllFaces([5, 3]),
			new BlockStair(112, "stone_brick_stairs").setAllFaces([21, 2]),
			new Block(113, "mycelium")
				.setTopFace([3, 15])
				.setBottomFace([8, 6])
				.setSideFaces([2, 15]),
			new Block(114, "nether_brick").setAllFaces([4, 15]),
			new BlockStair(115, "nether_brick_stairs").setAllFaces([4, 15]),
			new BlockEndPortalFrame(116, "end_portal_frame")
				.setSideFaces([14, 1])
				.setTopFace([14, 2])
				.setBottomFace([13, 7]),
			new Block(117, "end_stone").setAllFaces([13, 7]),

			// TODO: dragon egg
			new Block(118, "dragon_egg").setAllFaces(this.MISSING_TEXTURE),
			new Block(119, "redstone_lamp").setAllFaces([18, 15]),
			new BlockSlab(120, "oak_slab").setAllFaces([16, 4]),
			new BlockSlab(121, "spruce_slab").setAllFaces([16, 5]),
			new BlockSlab(122, "birch_slab").setAllFaces([16, 2]),
			new BlockSlab(123, "jungle_slab").setAllFaces([16, 3]),
			new BlockSlab(124, "acacia_slab").setAllFaces([16, 0]),
			new BlockSlab(125, "dark_oak_slab").setAllFaces([16, 1]),
			new BlockStair(126, "sandstone_stairs")
				.setSideFaces([19, 10])
				.setTopFace([19, 12])
				.setBottomFace([19, 8]),
			new Block(127, "emerald_ore").setAllFaces([13, 3]),
			new Block(128, "emerald_block").setAllFaces([13, 2]),
			new BlockStair(129, "spruce_stairs").setAllFaces([16, 5]),
			new BlockStair(130, "birch_stairs").setAllFaces([16, 2]),
			new BlockStair(131, "jungle_stairs").setAllFaces([16, 3]),

			new Block(132, "redstone_block").setAllFaces([18, 10]),
			new Block(133, "nether_quartz_ore").setAllFaces([17, 11]),
			new Block(134, "quartz_block").setAllFaces([17, 4]),
			new Block(135, "chiseled_quartz_block")
				.setTopFace([17, 6])
				.setBottomFace([17, 6])
				.setSideFaces([17, 5]),
			new Block(136, "pillar_quartz_block")
				.setTopFace([17, 8])
				.setBottomFace([17, 8])
				.setSideFaces([17, 7]),
			new BlockStair(137, "quartz_stairs").setAllFaces([17, 4]),
			new Block(138, "dropper")
				.setSouthFace([13, 0])
				.setNorthFace([5, 8])
				.setTopFace([6, 8])
				.setBottomFace([5, 8])
				.setEastFace([5, 8])
				.setWestFace([5, 8]),
			new Block(139, "white_terracotta").setAllFaces([0, 12]),
			new Block(140, "orange_terracotta").setAllFaces([11, 11]),
			new Block(141, "magenta_terracotta").setAllFaces([10, 11]),
			new Block(142, "light_blue_terracotta").setAllFaces([8, 11]),
			new Block(143, "yellow_terracotta").setAllFaces([1, 12]),
			new Block(144, "lime_terracotta").setAllFaces([9, 11]),

			new Block(145, "pink_terracotta").setAllFaces([12, 11]),
			new Block(146, "gray_terracotta").setAllFaces([6, 11]),
			new Block(147, "light_gray_terracotta").setAllFaces([15, 11]),
			new Block(148, "cyan_terracotta").setAllFaces([5, 11]),
			new Block(149, "purple_terracotta").setAllFaces([13, 11]),
			new Block(150, "blue_terracotta").setAllFaces([3, 11]),
			new Block(151, "brown_terracotta").setAllFaces([4, 11]),
			new Block(152, "green_terracotta").setAllFaces([7, 11]),
			new Block(153, "red_terracotta").setAllFaces([14, 11]),
			new Block(154, "black_terracotta").setAllFaces([2, 11]),
			new BlockLeaves(155, "acacia_leaves").setAllFaces([4, 13]),
			new BlockLeaves(156, "dark_oak_leaves").setAllFaces([4, 13]),
			new Block(157, "acacia_log")
				.setTopFace([12, 13])
				.setBottomFace([12, 13])
				.setSideFaces([11, 13]),
			new Block(158, "dark_oak_log")
				.setTopFace([14, 13])
				.setBottomFace([14, 13])
				.setSideFaces([13, 13]),
			new BlockStair(159, "acacia_stairs").setAllFaces([16, 0]),
			new BlockStair(160, "dark_oak_stairs").setAllFaces([16, 1]),
			new BlockTransparent(161, "slime_block").setAllFaces([20, 4]),
			new Block(162, "barrier").setAllFaces([23, 13]),
			new Block(163, "prismarine").setAllFaces([16, 13]),
			new Block(164, "prismarine_bricks").setAllFaces([16, 11]),
			new Block(165, "dark_prismarine").setAllFaces([16, 12]),
			new Block(166, "sea_lantern").setAllFaces([20, 3]),
			new Block(167, "hay_bale")
				.setTopFace([3, 12])
				.setBottomFace([3, 12])
				.setSideFaces([2, 12]),
			new Block(168, "terracotta").setAllFaces([1, 11]),
			new Block(169, "coal_block").setAllFaces([0, 5]),
			new Block(170, "packed_ice").setAllFaces([8, 12]),
			new Block(171, "red_sandstone")
				.setTopFace([18, 9])
				.setBottomFace([18, 5])
				.setSideFaces([18, 7]),
			new Block(172, "chiseled_red_sandstone")
				.setTopFace([18, 9])
				.setBottomFace([18, 9])
				.setSideFaces([18, 6]),
			new Block(173, "smooth_red_sandstone")
				.setTopFace([18, 9])
				.setBottomFace([18, 9])
				.setSideFaces([18, 8]),
			new BlockStair(174, "red_sandstone_stairs")
				.setTopFace([18, 9])
				.setBottomFace([18, 5])
				.setSideFaces([18, 7]),
			new BlockSlab(175, "red_sandstone_slab")
				.setTopFace([18, 9])
				.setBottomFace([18, 5])
				.setSideFaces([18, 7]),
		];

		for (const block of blocks) {
			BlockRegistry.REGISTRY.register(block.id, block.name, block);
		}

		// 110: [21, 2], // Brick Stairs
		// 111: [21, 2], // Stone Brick Stairs
		// 112: [3, 15], // Mycelium
		// 113: [4, 15], // Nether Brick
		// 114: [4, 15], // Nether Brick Stairs
		// 115: [14, 1], // End Portal Frame
		// 116: [13, 7], // End Stone
		// 117: [], // Dragon Egg
		// 118: [18, 15], // Redstone Lamp
		// 119: [16, 4], // Oak Wood Slab
		// 120: [16, 5], // Spruce Wood Slab
		// 121: [16, 2], // Birch Wood Slab
		// 122: [16, 3], // Jungle Wood Slab
		// 123: [16, 0], // Acacia Wood Slab
		// 124: [16, 1], // Dark Oak Wood Slab
		// 125: [19, 11], // Sandstone Stairs
		// 126: [13, 3], // Emerald Ore
		// 127: [13, 2], // Emerald Block
		// 128: [16, 5], // Spruce Wood Stairs
		// 129: [16, 2], // Birch Wood Stairs
		// 130: [16, 3], // Jungle Wood Stairs
		// 131: [18, 10], // Redstone Block
		// 132: [17, 11], // Nether Quartz Ore
		// 133: [17, 4], // Quartz Block
		// 134: [17, 5], // Chiseled Quartz Block
		// 135: [17, 7], // Pillar Quartz Block
		// 136: [17, 4], // Quartz Stairs
		// 137: [9, 1], // Dropper
		// 138: [0, 12], // White Hardened Clay
		// 139: [11, 11], // Orange Hardened Clay
		// 140: [10, 11], // Magenta Hardened Clay
		// 141: [8, 11], // Light Blue Hardened Clay
		// 142: [1, 12], // Yellow Hardened Clay
		// 143: [9, 11], // Lime Hardened Clay
		// 144: [12, 11], // Pink Hardened Clay
		// 145: [6, 11], // Gray Hardened Clay
		// 146: [15, 11], // Light Gray Hardened Clay
		// 147: [5, 11], // Cyan Hardened Clay
		// 148: [13, 11], // Purple Hardened Clay
		// 149: [3, 11], // Blue Hardened Clay
		// 150: [4, 11], // Brown Hardened Clay
		// 151: [7, 11], // Green Hardened Clay
		// 152: [14, 11], // Red Hardened Clay
		// 153: [2, 11], // Black Hardened Clay
		// 154: [4, 13], // Acacia Leaves //TODO
		// 155: [4, 13], // Dark Oak Leaves //TODO
		// 156: [11, 13], // Acacia Wood
		// 157: [13, 13], // Dark Oak Wood
		// 158: [16, 0], // Acacia Wood Stairs
		// 159: [16, 1], // Dark Oak Wood Stairs
		// 160: [20, 4], // Slime Block
		// 161: [23, 13], // Barrier
		// 162: [16, 13], // Prismarine
		// 163: [16, 11], // Prismarine Bricks
		// 164: [16, 12], // Dark Prismarine
		// 165: [20, 3], // Sea Lantern
		// 166: [3, 12], // Hay Bale
		// 167: [1, 11], // Hardened Clay
		// 168: [0, 5], // Block of Coal
		// 169: [8, 12], // Packed Ice
		// 170: [18, 5], // Red Sandstone
		// 171: [18, 6], // Chiseled Red Sandstone
		// 172: [18, 9], // Smooth Red Sandstone
		// 173: [18, 7], // Red Sandstone Stairs
		// 174: [18, 7], // Red Sandstone Slab

		// 1: [20, 9], // Stone
		// 2: [20, 14], // Granite
		// 3: [20, 15], // Polished Granite
		// 4: [20, 12], // Diorite
		// 5: [20, 13], // Polished Diorite
		// 6: [20, 10], // Andesite
		// 7: [20, 11], // Polished Andesite
		// 8: [12, 10], // Grass
		// 9: [8, 6], // Dirt
		// 10: [2, 5], // Coarse Dirt
		// 11: [9, 0], // Podzol
		// 12: [3, 5], // Cobblestone
		// 13: [16, 4], // Oak Wood Plank
		// 14: [16, 5], // Spruce Wood Plank
		// 15: [16, 2], // Birch Wood Plank
		// 16: [16, 3], // Jungle Wood Plank
		// 17: [16, 0], // Acacia Wood Plank
		// 18: [16, 1], // Dark Oak Wood Plank
		// 19: [4, 3], // Bedrock
		// 20: [19, 7], // Sand
		// 21: [18, 4], // Red Sand
		// 22: [0, 11], // Gravel
		// 23: [11, 10], // Gold Ore
		// 24: [11, 12], // Iron Ore
		// 25: [0, 5], // Coal Ore
		// 26: [3, 14], // Oak Wood
		// 27: [5, 14], // Spruce Wood

		// 28: [15, 13], // Birch Wood
		// 29: [1, 14], // Jungle Wood
		// 30: [4, 13], // Oak Leaves //TODO
		// 31: [4, 13], // Spruce Leaves //TODO
		// 32: [4, 13], // Birch Leaves //TODO
		// 33: [20, 7], // Sponge
		// 34: [20, 8], // Wet Sponge
		// 35: [7, 8], // Glass
		// 36: [2, 13], // Lapis Lazuli Ore
		// 37: [1, 13], // Lapis Lazuli Block
		// 38: [13, 0], // Dispenser
		// 39: [19, 10], // Sandstone
		// 40: [19, 9], // Chiseled Sandstone
		// 41: [19, 11], // Smooth Sandstone
		// 42: [14, 12], // Note Block
		// 43: [15, 15], // Sticky Piston
		// 44: [13, 15], // Piston
		// 45: [23, 8], // White Wool
		// 46: [23, 3], // Orange Wool
		// 47: [23, 2], // Magenta Wool
		// 48: [23, 0], // Light Blue Wool
		// 49: [23, 9], // Yellow Wool
		// 50: [23, 1], // Lime Wool
		// 51: [23, 4], // Pink Wool
		// 52: [22, 14], // Gray Wool
		// 53: [23, 7], // Light Gray Wool
		// 54: [22, 13], // Cyan Wool
		// 55: [23, 5], // Purple Wool
		// 56: [22, 11], // Blue Wool
		// 57: [22, 13], // Brown Wool
		// 58: [22, 15], // Green Wool
		// 59: [23, 6], // Red Wool
		// 60: [22, 10], // Black Wool
		// 61: [10, 10], // Gold Block
		// 62: [10, 12], // Iron Block
		// 63: [21, 1], // Stone Slab
		// 64: [19, 10], // Sandstone Slab
		// 65: [3, 5], // Cobblestone Slab
		// 66: [5, 3], // Brick Slab
		// 67: [21, 0], // Stone Brick Slab
		// 68: [4, 15], // Nether Brick Slab
		// 69: [17, 4], // Quartz Slab
		// 70: [5, 3], // Bricks
		// 71: [5, 0], // Bookshelf
		// 72: [4, 5], // Moss Stone
		// 73: [13, 4], // Obsidian
		// 74: [16, 4], // Oak Wood Stairs
		// 75: [8, 5], // Diamond Ore
		// 76: [8, 4], // Diamond Block
		// 77: [3, 6], // Crafting Table
		// 78: [3, 8], // Furnace
		// 79: [3, 5], // Cobblestone Stairs
		// 80: [19, 1], // Redstone Ore
		// 81: [7, 12], // Ice
		// 82: [20, 5], // Snow Block
		// 83: [7, 4], // Clay
		// 84: [16, 14], // Pumpkin
		// 85: [8, 15], // Netherrack
		// 86: [20, 6], // Soul Sand
		// 87: [9, 10], // Glowstone
		// 88: [16, 15], // Jack o'Lantern
		// 89: [7, 10], // White Stained Glass
		// 90: [1, 9], // Orange Stained Glass
		// 91: [0, 9], // Magenta Stained Glass
		// 92: [14, 8], // Light Blue Stained Glass
		// 93: [8, 10], // Yellow Stained Glass
		// 94: [15, 8], // Lime Stained Glass
		// 95: [3, 10], // Pink Stained Glass
		// 96: [12, 8], // Gray Stained Glass
		// 97: [6, 10], // Light Gray Stained Glass
		// 98: [14, 8], // Cyan Stained Glass
		// 99: [4, 10], // Purple Stained Glass
		// 100: [9, 8], // Blue Stained Glass
		// 101: [10, 8], // Brown Stained Glass
		// 102: [13, 8], // Green Stained Glass
		// 103: [5, 10], // Red Stained Glass
		// 104: [8, 8], // Black Stained Glass
		// 105: [21, 2], // Stone Bricks
		// 106: [21, 5], // Mossy Stone Bricks
		// 107: [21, 4], // Cracked Stone Bricks
		// 108: [21, 3], // Chiseled Stone Bricks
		// 109: [7, 14], // Melon Block
	}

	public static getBlockByName(name: string): Block {
		const block = BlockRegistry.REGISTRY.getValue(name);
		if (block) return block;

		throw new Error(`Block with name ${name} not found`);
	}

	public static getBlock(id: number): Block {
		const block = BlockRegistry.REGISTRY.getValueByID(id);
		if (block) return block;

		throw new Error(`Block with id ${id} not found`);
	}
}
