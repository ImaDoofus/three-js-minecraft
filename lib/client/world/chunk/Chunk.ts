import { Block } from "../../block/Block.ts";
import {
	BufferGeometry,
	Mesh,
	BufferAttribute,
	MeshBasicMaterial,
	MeshLambertMaterial
} from "three";
import type { HousingWorld } from "../World.ts";
import { TextureManager } from "../../assets/TextureManager.ts";
import { BlockRegistry } from "../../block/BlockRegistry.ts";

export default class Chunk {
	static readonly SIZE = 32;

	geometry = {
		positions: [] as number[],
		normals: [] as number[],
		uvs: [] as number[],
		indices: [] as number[],
		colors: [] as number[],
	};
	mesh: Mesh;
	isDirty = false;

	constructor(
		public x: number,
		public y: number,
		public z: number,
	) {
		const texture = TextureManager.getBlockTextures();
		const geometry = new BufferGeometry();
		const material = new MeshBasicMaterial({
			map: texture,
			// wireframe: true,
			// side: DoubleSide,
			vertexColors: true,
			// transparent: true,
			alphaTest: 0.5,
		});

		this.mesh = new Mesh(geometry, material);
		this.mesh.frustumCulled = false;
	}

	buildMesh() {
		const geometry = this.mesh.geometry;
		geometry.setAttribute(
			"position",
			new BufferAttribute(new Float32Array(this.geometry.positions), 3),
		);
		geometry.setAttribute(
			"normal",
			new BufferAttribute(new Float32Array(this.geometry.normals), 3),
		);
		geometry.setAttribute(
			"uv",
			new BufferAttribute(new Float32Array(this.geometry.uvs), 2),
		);
		geometry.setAttribute(
			"color",
			new BufferAttribute(new Float32Array(this.geometry.colors), 3),
		);

		geometry.setIndex(this.geometry.indices);
		geometry.computeVertexNormals();
	}

	updateGeometry(world: HousingWorld) {
		const size = Chunk.SIZE;
		const worldX = this.x * size;
		const worldY = this.y * size;
		const worldZ = this.z * size;

		const estimatedSize = size * size * size * 6;
		this.geometry.positions = new Array(estimatedSize * 3);
		this.geometry.normals = new Array(estimatedSize * 3);
		this.geometry.uvs = new Array(estimatedSize * 2);
		this.geometry.indices = new Array(estimatedSize);
		this.geometry.colors = new Array(estimatedSize * 3);

		let posIdx = 0,
			normIdx = 0,
			uvIdx = 0,
			idxIdx = 0,
			colorIdx = 0;

		let currentIndex = 0;
		for (let i = 0; i < size * size * size; i++) {
			const x = i % size;
			const y = Math.floor((i / size) % size);
			const z = Math.floor(i / (size * size));

			const worldXPos = worldX + x;
			const worldYPos = worldY + y;
			const worldZPos = worldZ + z;

			const blockId = world.getUnsafe(worldXPos, worldYPos, worldZPos);
			if (blockId !== BlockRegistry.getBlockByName("air").id) {
				const block = BlockRegistry.getBlock(blockId);
				const colorMultiplier = block.getColorMultiplier(
					world,
					worldXPos,
					worldYPos,
					worldZPos,
				);

				for (const face of block.faces) {
					if (face.shouldCull) {
						const neighborID = world.get(
							worldXPos + face.geometry.normal[0],
							worldYPos + face.geometry.normal[1],
							worldZPos + face.geometry.normal[2],
						);
						const neighbor = BlockRegistry.getBlock(neighborID);
						if (neighbor.isOpaqueCube) continue;
					}

					let r = face.geometry.brightness;
					let g = face.geometry.brightness;
					let b = face.geometry.brightness;

					if (face.shouldTint) {
						r *= colorMultiplier[0];
						g *= colorMultiplier[1];
						b *= colorMultiplier[2];
					}

					// TODO: add AO
					// https://github.com/PrismarineJS/prismarine-viewer/blob/7102f49e287cab116802bc61ad03d05e2ad395db/viewer/lib/models.js#L326


					for (let j = 0; j < 3 * 4; j += 3) {
						this.geometry.positions[posIdx++] =
							face.geometry.positions[j] + worldXPos;
						this.geometry.positions[posIdx++] =
							face.geometry.positions[j + 1] + worldYPos;
						this.geometry.positions[posIdx++] =
							face.geometry.positions[j + 2] + worldZPos;
						this.geometry.normals[normIdx++] = face.geometry.normal[0];
						this.geometry.normals[normIdx++] = face.geometry.normal[1];
						this.geometry.normals[normIdx++] = face.geometry.normal[2];
						this.geometry.colors[colorIdx++] = r;
						this.geometry.colors[colorIdx++] = g;
						this.geometry.colors[colorIdx++] = b;
					}

					for (let j = 0; j < 8; j++) {
						this.geometry.uvs[uvIdx++] = face.uvs[j];
					}

					for (let j = 0; j < 6; j++) {
						this.geometry.indices[idxIdx++] =
							currentIndex + face.geometry.indices[j];
					}

					currentIndex += 4;
				}
			}
		}

		// console.log("posIdx", posIdx, "normIdx", normIdx, "uvIdx", uvIdx, "idxIdx", idxIdx);
		// console.log("positions", this.geometry.positions);
		// console.log(this.geometry.positions.length);
		// console.log("normals", this.geometry.normals);
		// console.log("uvs", this.geometry.uvs);
		this.geometry.positions.length = posIdx;
		this.geometry.normals.length = normIdx;
		this.geometry.uvs.length = uvIdx;
		this.geometry.indices.length = idxIdx;
		this.geometry.colors.length = colorIdx;
	}
}
