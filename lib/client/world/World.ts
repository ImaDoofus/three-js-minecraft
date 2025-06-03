import { Mesh } from "three";
import Chunk from "./chunk/Chunk";
import type { Minecraft } from "../main/Minecraft";
import { Text } from "troika-three-text";
import { FloatingText } from "../entities/FloatingText";

export class HousingWorld {
	static readonly SIZE = 256;
	static readonly BLOCK_SHIFT = Math.log2(HousingWorld.SIZE);
	static readonly CHUNKS_PER_AXIS = HousingWorld.SIZE / Chunk.SIZE;
	static readonly CHUNK_SHIFT = Math.log2(HousingWorld.CHUNKS_PER_AXIS);

	public chunks: Array<Chunk | undefined>;
	private blocks: Uint8Array;

	constructor(public minecraft: Minecraft) {
		this.blocks = new Uint8Array(HousingWorld.SIZE ** 3);
		this.chunks = new Array(HousingWorld.CHUNKS_PER_AXIS ** 3);

		this.createWalls();
	}

	getFoliageColorAtPosition(
		x: number,
		y: number,
		z: number,
	): [number, number, number] {
		return [119 / 255, 171 / 255, 47 / 255];
	}

	getGrassColorAtPosition(
		x: number,
		y: number,
		z: number,
	): [number, number, number] {
		// return [124 / 255, 252 / 255, 0];
    // return [ 0.5686, 0.5020, 0.2235 ];
    // 145, 189, 89
    // 89, 201, 60
    return [89 / 255, 201 / 255, 60 / 255];
	}

	createWalls() {
		const OFFSET = 256;
		const wallConfigs = [
			{ name: "north", axis: "-Z", pos: [0, 0, -OFFSET], rot: [0, 0, 0] },
			{ name: "south", axis: "+Z", pos: [0, 0, OFFSET], rot: [0, Math.PI, 0] },
			{
				name: "east",
				axis: "+X",
				pos: [OFFSET, 0, 0],
				rot: [0, -Math.PI / 2, 0],
			},
			{
				name: "west",
				axis: "-X",
				pos: [-OFFSET, 0, 0],
				rot: [0, Math.PI / 2, 0],
			},
		];

		for (const { name, axis, pos, rot } of wallConfigs) {
			const createText = (text: string, fontSize: number, yOffset: number) => {
				const txt = new Text();
				txt.outlineWidth = 1;
				txt.text = text;
				txt.anchorX = "center";
				txt.fontSize = fontSize;
				txt.position.set(
					HousingWorld.SIZE / 2 + pos[0],
					HousingWorld.SIZE / 3 + pos[1] + yOffset,
					HousingWorld.SIZE / 2 + pos[2],
				);
				txt.rotation.set(...rot);
				txt.sync();
				return txt;
			};

			this.minecraft.scene.add(createText(name, 16, 0));
			this.minecraft.scene.add(createText(axis, 8, -20));
		}
	}

	private createChunk(x: number, y: number, z: number) {
		const index = this.getChunkIndex(x, y, z);
		const chunk = new Chunk(x, y, z);
		this.chunks[index] = chunk;
		this.minecraft.scene.add(chunk.mesh);
	}

	set(x: number, y: number, z: number, block: number) {
		const chunkX = Math.floor(x / Chunk.SIZE);
		const chunkY = Math.floor(y / Chunk.SIZE);
		const chunkZ = Math.floor(z / Chunk.SIZE);
		const chunk = this.getChunk(chunkX, chunkY, chunkZ);
		chunk.isDirty = true;
		this.blocks[this.getBlockIndex(x, y, z)] = block;
	}

	get(x: number, y: number, z: number): number {
		if (this.isOutOfBounds(x, y, z)) return 0;
		return this.blocks[this.getBlockIndex(x, y, z)];
	}

	getUnsafe(x: number, y: number, z: number): number {
		return this.blocks[this.getBlockIndex(x, y, z)];
	}

	buildChunks() {
		for (const chunk of this.chunks) {
			if (chunk && chunk.isDirty) {
				chunk.updateGeometry(this);
				chunk.buildMesh();
				chunk.isDirty = false;
			}
		}
	}

	clear() {
		this.blocks.fill(0);
		for (const chunk of this.chunks) {
			if (chunk) {
				this.minecraft.scene.remove(chunk.mesh);
			}
		}
		this.chunks = new Array(HousingWorld.CHUNKS_PER_AXIS ** 3);
	}

	private getChunkIndex(
		chunkX: number,
		chunkY: number,
		chunkZ: number,
	): number {
		return (
			(((chunkX << HousingWorld.CHUNK_SHIFT) | chunkY) <<
				HousingWorld.CHUNK_SHIFT) |
			chunkZ
		);
	}

	private getChunk(chunkX: number, chunkY: number, chunkZ: number): Chunk {
		const index = this.getChunkIndex(chunkX, chunkY, chunkZ);
		if (!this.chunks[index]) {
			this.createChunk(chunkX, chunkY, chunkZ);
		}
		return this.chunks[index]!;
	}

	private getBlockIndex(x: number, y: number, z: number): number {
		return (
			(((x << HousingWorld.BLOCK_SHIFT) | y) << HousingWorld.BLOCK_SHIFT) | z
		);
	}

	private isOutOfBounds(x: number, y: number, z: number): boolean {
		return (
			x < 0 ||
			x >= HousingWorld.SIZE ||
			y < 0 ||
			y >= HousingWorld.SIZE ||
			z < 0 ||
			z >= HousingWorld.SIZE
		);
	}
}
