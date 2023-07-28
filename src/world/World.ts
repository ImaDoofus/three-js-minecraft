import { Block } from "../block/Block";
import { BufferAttribute } from "three";
import { BufferGeometry, BoxGeometry } from "three";
import { MathUtils } from "three";
import { Mesh, MeshStandardMaterial } from "three";

export class World {
  minecraftInstance;
  chunks: Chunk[] = [];

  constructor(minecraftInstance) {
    this.minecraftInstance = minecraftInstance;
  }

  setBlock(x, y, z, block) {
    const { chunkX, chunkY, chunkZ, blockX, blockY, blockZ } =
      this.getChunkAndBlockPosition(x, y, z);
    const chunk = this.getChunk(chunkX, chunkY, chunkZ);
    chunk.setBlock(blockX, blockY, blockZ, block);
  }

  getBlock(x, y, z) {
    const { chunkX, chunkY, chunkZ, blockX, blockY, blockZ } =
      this.getChunkAndBlockPosition(x, y, z);
    const chunk = this.getChunk(chunkX, chunkY, chunkZ);
    return chunk.getBlock(blockX, blockY, blockZ);
  }

  getChunkAndBlockPosition(x, y, z) {
    const chunkX = Math.floor(x / Chunk.size);
    const chunkY = Math.floor(y / Chunk.size);
    const chunkZ = Math.floor(z / Chunk.size);
    const blockX = MathUtils.euclideanModulo(x, Chunk.size);
    const blockY = MathUtils.euclideanModulo(y, Chunk.size);
    const blockZ = MathUtils.euclideanModulo(z, Chunk.size);
    return { chunkX, chunkY, chunkZ, blockX, blockY, blockZ };
  }

  getChunk(x, y, z) {
    for (const chunk of this.chunks) {
      if (chunk.x === x && chunk.y === y && chunk.z === z) return chunk;
    }
    const chunk = new Chunk(x, y, z, this, this.minecraftInstance);
    this.chunks.push(chunk);
    return chunk;
  }

  updateAllChunks() {
    for (const chunk of this.chunks.values()) {
      if (!chunk.isDirty) continue;
      chunk.updateGeometry();
      chunk.buildMesh();
    }
  }

  getLikeness(other: World) {
    let likeness = 0;
    for (let i = 0; i < this.chunks.length; i++) {
      const chunk = this.chunks[i];
      const otherChunk = other.chunks[i];
      if (!otherChunk) continue;
      likeness += chunk.getLikeness(otherChunk);
    }
    return likeness / this.chunks.length / Chunk.size ** 3;
  }

  clear() {
    for (const chunk of this.chunks) {
      this.minecraftInstance.scene.remove(chunk.mesh);
    }
    this.chunks = [];
  }
}

class Chunk {
  x;
  y;
  z;
  blocks;
  geometry;
  mesh;
  world: World;
  isDirty = false;

  constructor(x, y, z, world, minecraftInstance) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.blocks = new Uint8Array(Chunk.size * Chunk.size * Chunk.size);
    this.world = world;

    this.geometry = {
      positions: [],
      normals: [],
      indices: [],
    };

    const geometry = new BufferGeometry();
    const material = new MeshStandardMaterial();

    this.mesh = new Mesh(geometry, material);
    this.mesh.position.set(
      this.x * Chunk.size,
      this.y * Chunk.size,
      this.z * Chunk.size
    );
    this.mesh.frustumCulled = false;
    minecraftInstance.scene.add(this.mesh);
  }

  buildMesh() {
    const geometry = this.mesh.geometry;
    geometry.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(this.geometry.positions), 3)
    );
    geometry.setAttribute(
      "normal",
      new BufferAttribute(new Float32Array(this.geometry.normals), 3)
    );

    geometry.setIndex(this.geometry.indices);
    geometry.computeVertexNormals();
  }

  updateGeometry() {
    this.geometry.positions = [];
    this.geometry.normals = [];
    this.geometry.indices = [];

    const size = Chunk.size;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          const block = this.getBlock(x, y, z);
          if (block) {
            for (const { face, corners } of Block.getFacesByID(block)) {
              // // handle chunk boundaries
              let neighbor;
              if (
                x + face[0] < 0 ||
                x + face[0] >= size ||
                y + face[1] < 0 ||
                y + face[1] >= size ||
                z + face[2] < 0 ||
                z + face[2] >= size
              ) {
                neighbor = this.world.getBlock(
                  this.x * size + x + face[0],
                  this.y * size + y + face[1],
                  this.z * size + z + face[2]
                );
              } else {
                neighbor = this.getBlock(x + face[0], y + face[1], z + face[2]);
              }

              if (neighbor === 0) this.addFace(x, y, z, corners, face);
            }
          }
        }
      }
    }
  }

  getBlock(x, y, z) {
    const index = (x << 8) + (y << 4) + z;
    return this.blocks[index];
  }

  setBlock(x, y, z, block) {
    const index = (x << 8) + (y << 4) + z;
    this.blocks[index] = block;
    this.isDirty = true;
  }

  addFace(x, y, z, corners, face) {
    const index = this.geometry.positions.length / 3;
    for (const corner of corners) {
      this.geometry.positions.push(x + corner[0], y + corner[1], z + corner[2]);
    }
    this.geometry.normals.push(...face, ...face, ...face, ...face);
    this.geometry.indices.push(
      index,
      index + 1,
      index + 2,
      index + 2,
      index + 1,
      index + 3
    );
  }

  getLikeness(other: Chunk) {
    let likeness = 0;
    for (let i = 0; i < this.blocks.length; i++) {
      const block = this.blocks[i];
      const otherBlock = other.blocks[i];
      if (block === otherBlock) likeness++;
      else likeness--;
    }
    return likeness;
  }

  static size = 16;

  toString() {
    return `Chunk(${this.x}, ${this.y}, ${this.z})`;
  }
}
