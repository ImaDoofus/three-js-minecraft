import { v4 as uuidv4 } from 'uuid';
import { Vector3 } from 'three';

class Entity {
	static nextEntityId = 0;
	constructor(mesh) {
		this.mesh = mesh;

		this.entityId = Entity.nextEntityId++;
		this.uuid = uuidv4();

		this.velocity = new Vector3();
	}

	setPosition(x, y, z) {
		if (x instanceof Vector3) {
			this.mesh.position.copy(x);
			return;
		}
		this.mesh.position.set(x, y, z);
	}

	getPosition() {
		return this.mesh.position;
	}

	setVelocity(x, y, z) {
		this.velocity.set(x, y, z);
	}

	getVelocity() {
		return this.velocity;
	}

	update() {
		this.mesh.position.add(this.velocity);
	}

	spawn(scene) {
		scene.add(this.mesh);
	}
}

export default Entity;