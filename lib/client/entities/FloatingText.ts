import { Text } from "troika-three-text";
// @ts-types="npm:@types/three"
import { Mesh,
	PlaneGeometry,
	MeshBasicMaterial,
	DoubleSide,
	Group,
 } from "three";

export class FloatingText extends Group {
	public textElement: Text;
	public backgroundElement: Mesh;

	constructor(
		public text: string,
	) {
		super();

		const txt = new Text();
		this.textElement = txt;

		// woff2 is not supported
		// TODO: change to smaller format woff
		txt.font = "assets/fonts/minecraftio.otf";
		txt.text = text.replace(/&[0-9a-fklmnor]/g, '');
		txt.anchorX = "center";
		txt.fontSize = 0.20;
		// txt.letterSpacing = 1 / 8;
		txt.colorRanges = this.getColorRanges();
		txt.sdfGlyphSize = 128;
		const background = new Mesh(
			new PlaneGeometry(1, 1),
			new MeshBasicMaterial({
				color: 0x000000,
				transparent: true,
				opacity: 0.2,
				side: DoubleSide,
				polygonOffset: true,
				polygonOffsetFactor: 1,
				polygonOffsetUnits: 1,
			}),
		);
		this.backgroundElement = background;

		const paddingX = 1 / 16;
		const paddingY = 1 / 16;

		txt.sync(() => {
			  const width = txt.geometry.boundingBox.max.x - txt.geometry.boundingBox.min.x;
			  const height = txt.geometry.boundingBox.max.y - txt.geometry.boundingBox.min.y;
			  background.scale.set(width + paddingX, height + paddingY, 1);
			  background.position.set(0, -height / 2, 0);
		});
		

		this.add(this.textElement);
		this.add(this.backgroundElement);

		// make sure the text renders on top of the background
		// this.textElement.renderOrder = 1;
		// this.backgroundElement.renderOrder = 0;
	}

	// dispose() {
	// 	this.textElement.dispose();
	// }

	private getColorRanges() {
		const ranges = {};
		const parts = this.text.split(/(&[0-9a-fklmnor])/);
		let i = 0;
		for (const part of parts) {
			if (part.startsWith("&")) {
				const colorCode = part[1];
				if (minecraftColorMap[colorCode]) {
					ranges[i.toString()] = minecraftColorMap[colorCode];
				}
			} else {
				i += part.length;
			}
		}		
		return ranges;
	}
}

const minecraftColorMap: Record<string, string> = {
  "0": "#000000", // Black
  "1": "#0000AA", // Dark Blue
  "2": "#00AA00", // Dark Green
  "3": "#00AAAA", // Dark Aqua
  "4": "#AA0000", // Dark Red
  "5": "#AA00AA", // Dark Purple
  "6": "#FFAA00", // Gold
  "7": "#AAAAAA", // Gray
  "8": "#555555", // Dark Gray
  "9": "#5555FF", // Blue
  "a": "#55FF55", // Green
  "b": "#55FFFF", // Aqua
  "c": "#FF5555", // Red
  "d": "#FF55FF", // Light Purple
  "e": "#FFFF55", // Yellow
  "f": "#FFFFFF", // White
};
