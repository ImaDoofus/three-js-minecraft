import { TextureLoader, NearestFilter, SRGBColorSpace } from "three";
import blockTextures from "./block_textures.webp";
// import blockTextures from "./uv1.png";

export class TextureManager {
	static blockTextures: any;

	static load(url: string) {
		const loader = new TextureLoader();
		const texture = loader.load(url);
		texture.magFilter = NearestFilter;
		texture.minFilter = NearestFilter;
		texture.colorSpace = SRGBColorSpace;
		return texture;
	}

	static getBlockTextures() {
		if (!TextureManager.blockTextures) {
			TextureManager.blockTextures = TextureManager.load(blockTextures);
		}
		return TextureManager.blockTextures;
	}
}
