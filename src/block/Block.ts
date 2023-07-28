import { ResourceLocation } from "../util/ResourceLocation";
import { RegistryNamespaced } from "../util/registry/RegistryNamespaced";

export class Block {
  public static readonly REGISTRY: RegistryNamespaced<ResourceLocation, Block> =
    new RegistryNamespaced<ResourceLocation, Block>();

  constructor() {}

  private static faces = [
    {
      // left
      face: [-1, 0, 0],
      corners: [
        [0, 1, 0],
        [0, 0, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    },
    {
      // right
      face: [1, 0, 0],
      corners: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 0],
      ],
    },
    {
      // bottom
      face: [0, -1, 0],
      corners: [
        [1, 0, 1],
        [0, 0, 1],
        [1, 0, 0],
        [0, 0, 0],
      ],
    },
    {
      // top
      face: [0, 1, 0],
      corners: [
        [0, 1, 1],
        [1, 1, 1],
        [0, 1, 0],
        [1, 1, 0],
      ],
    },
    {
      // back
      face: [0, 0, -1],
      corners: [
        [1, 0, 0],
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    },
    {
      // front
      face: [0, 0, 1],
      corners: [
        [0, 0, 1],
        [1, 0, 1],
        [0, 1, 1],
        [1, 1, 1],
      ],
    },
  ];

  public static getFacesByID(id: number): Array<any> {
    return Block.faces;
  }

  public static getIDByBlock(block: Block): number | undefined {
    return Block.REGISTRY.getID(block);
  }

  public static getBlockByID(id: number): Block | undefined {
    return Block.REGISTRY.getValueByID(id);
  }

  public static getBlockByName(blockName: string): Block | undefined {
    return Block.REGISTRY.getValue(new ResourceLocation(blockName));
  }

  public static registerBlock(
    id: number,
    blockName: string,
    block: Block
  ): void {
    Block.REGISTRY.register(id, new ResourceLocation(blockName), block);
  }
}
