import Entity from './Entity.js';
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

class EntityBlockDisplay extends Entity {
	constructor(block = "air") {
		const geometry = new BoxGeometry(1, 1, 1);
		const material = new MeshBasicMaterial({ color: 0x00ff00 });
		const mesh = new Mesh(geometry, material);

		super(mesh);

		this.block = block;
	}
}

export default EntityBlockDisplay;