type FaceSide = "top" | "bottom" | "north" | "south" | "east" | "west";

type Corner = [number, number, number];

type Normal = [number, number, number];
type FaceUVs = [number, number, number, number, number, number, number, number];
type BakedPositions = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
];

export class BlockFaceGeometry {
	public normal: Normal;
	public positions: BakedPositions;
	public faceUVs: FaceUVs;
	public indices = [0, 1, 2, 2, 1, 3];
	public brightness = 1;

	constructor(direction: FaceSide, from: Corner, to: Corner) {
		this.validate(direction, from, to);

		this.normal = this.getDirectionVector(direction);
		this.brightness = this.getBrightness(direction);
		this.positions = this.calculatePositions(direction, from, to);
		this.faceUVs = this.calculateUVs(direction, from, to);
	}

	private validate(direction: FaceSide, from: Corner, to: Corner) {
		// throw error if from and to are not on the same plane or if from > to
		const [fromX, fromY, fromZ] = from;
		const [toX, toY, toZ] = to;

		if (direction === "top" || direction === "bottom") {
			if (fromY !== toY) {
				throw new Error(
					"Cannot create top/bottom face with different Y values",
				);
			}
		} else if (direction === "east" || direction === "west") {
			if (fromX !== toX) {
				throw new Error("Cannot create east/west face with different X values");
			}
		} else if (direction === "north" || direction === "south") {
			if (fromZ !== toZ) {
				throw new Error(
					"Cannot create north/south face with different Z values",
				);
			}
		}

		if (fromX > toX || fromY > toY || fromZ > toZ) {
			throw new Error("From must be less than to");
		}
	}

	// https://github.com/Marcelektro/MCP-919/blob/1717f75902c6184a1ed1bfcd7880404aab4da503/src/minecraft/net/minecraft/client/renderer/block/model/FaceBakery.java#L55
	private getBrightness(direction: FaceSide): number {
		switch (direction) {
			case "top":
				return 1;
			case "bottom":
				return 0.5;
			case "north":
			case "south":
				return 0.8;
			case "east":
			case "west":
				return 0.6;
		}
	}

	private calculatePositions(
		direction: FaceSide,
		from: Corner,
		to: Corner,
	): BakedPositions {
		// trial and error to get the correct positions
		const [fromX, fromY, fromZ] = from;
		const [toX, toY, toZ] = to;

		const a = [fromX, toY, toZ];
		const b = [fromX, toY, fromZ];
		const c = [toX, toY, toZ];
		const d = [toX, toY, fromZ];
		const e = [toX, fromY, toZ];
		const f = [fromX, fromY, toZ];
		const g = [toX, fromY, fromZ];

		const h = [a, b].flat();
		const i = [c, d].flat();
		const j = [e, c].flat();
		const k = [f, a].flat();
		const l = [g, d].flat();

		switch (direction) {
			case "top":
				// return [...c, ...b, ...g, ...f];
				return [i, h].flat() as BakedPositions;
			case "bottom":
				// return [...g, ...f, ...c, ...b];
				return [h, i].flat() as BakedPositions;
			case "north":
				// return [...e, ...g, ...a, ...c];
				return [k, j].flat() as BakedPositions;
			case "south":
				// return [...a, ...c, ...e, ...g];
				return [j, k].flat() as BakedPositions;
			case "east":
				// return [...e, ...g, ...d, ...f];
				return [l, j].flat() as BakedPositions;
			case "west":
				// return [...d, ...f, ...e, ...g];
				return [j, l].flat() as BakedPositions;
		}
	}

	private calculateUVs(direction: FaceSide, from: Corner, to: Corner): FaceUVs {
		let i1, i2;

		switch (direction) {
			case "west":
			case "east":
				i1 = 2;
				i2 = 1;
				break;
			case "north":
			case "south":
				i1 = 0;
				i2 = 1;
				break;
			case "top":
			case "bottom":
				i1 = 0;
				i2 = 2;
				break;
		}

		// [1, 0, 1, 1, 0, 0, 0, 1] // pattern 0 is from and 1 is to
		return [
			to[i1],
			from[i2],
			to[i1],
			to[i2],
			from[i1],
			from[i2],
			from[i1],
			to[i2],
		];
	}

	private getDirectionVector(direction: FaceSide): Normal {
		switch (direction) {
			case "top":
				return [0, 1, 0];
			case "bottom":
				return [0, -1, 0];
			case "east":
				return [1, 0, 0];
			case "west":
				return [-1, 0, 0];
			case "south":
				return [0, 0, 1];
			case "north":
				return [0, 0, -1];
		}
	}

	static readonly TOP = new BlockFaceGeometry("top", [0, 1, 0], [1, 1, 1]);
	static readonly BOTTOM = new BlockFaceGeometry(
		"bottom",
		[0, 0, 0],
		[1, 0, 1],
	);
	static readonly NORTH = new BlockFaceGeometry("north", [0, 0, 0], [1, 1, 0]);
	static readonly SOUTH = new BlockFaceGeometry("south", [0, 0, 1], [1, 1, 1]);
	static readonly EAST = new BlockFaceGeometry("east", [1, 0, 0], [1, 1, 1]);
	static readonly WEST = new BlockFaceGeometry("west", [0, 0, 0], [0, 1, 1]);
}
