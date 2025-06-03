import { Euler, Quaternion, Vector3 } from "three";

const _euler = new Euler(0, 0, 0, "YXZ");
const _vector = new Vector3();
const _PI_2 = Math.PI / 2;

class MinecraftControls {
	camera: any;
	domElement: HTMLElement;
	lockedIn: boolean;
	minPolarAngle: number;
	maxPolarAngle: number;
	pointerSpeed: number;
	keyMap: { [key: string]: boolean };
	motionX: number;
	motionY: number;
	motionZ: number;
	flySpeed: number;
	
	private lastSavedQuaternion: any;
	private updateCallback: (() => void) | undefined;

	constructor(camera: any, domElement: HTMLElement) {
		this.camera = camera;
		this.domElement = domElement;
		this.lockedIn = false;

		this.lastSavedQuaternion = new Quaternion();

		// Set to constrain the pitch of the camera
		this.minPolarAngle = 0.01; // radians
		this.maxPolarAngle = Math.PI - 0.01; // radians

		this.pointerSpeed = 1;

		// keyboard controls
		this.keyMap = {};

		// movement
		this.motionX = 0;
		this.motionY = 0;
		this.motionZ = 0;
		this.flySpeed = 1;

		// Event listeners
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onPointerlockChange = this.onPointerlockChange.bind(this);
		this.onPointerlockError = this.onPointerlockError.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onScroll = this.onScroll.bind(this);

		this.connect();
	}

	private onMouseMove(event: MouseEvent) {
		if (!this.lockedIn) return;

		const movementX =
			event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		const movementY =
			event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		_euler.setFromQuaternion(this.camera.quaternion);

		_euler.y -= movementX * 0.002 * this.pointerSpeed;
		_euler.x -= movementY * 0.002 * this.pointerSpeed;

		_euler.x = Math.max(
			_PI_2 - this.maxPolarAngle,
			Math.min(_PI_2 - this.minPolarAngle, _euler.x),
		);

		this.lastSavedQuaternion.copy(this.camera.quaternion);
		this.camera.quaternion.setFromEuler(_euler);
		if (this.updateCallback) this.updateCallback();
	}

	private onPointerlockChange() {
		const isLocked = this.domElement.ownerDocument.pointerLockElement === this.domElement;
		this.lockedIn = isLocked;

		// Fixes the bug where the camera move on unlock because the mouse moves?
		if (!isLocked) {
			this.camera.quaternion.copy(this.lastSavedQuaternion);
		}
	}

	private onPointerlockError() {
		console.error("Unable to use Pointer Lock API");
		this.lockedIn = false;
	}

	private onKeyDown(event: KeyboardEvent) {
		if (event.code === "Space" && this.lockedIn) {
			event.preventDefault();
		}
		this.keyMap[event.code] = true;
	}

	private onKeyUp(event: KeyboardEvent) {
		this.keyMap[event.code] = false;
	}

	private onScroll(event: WheelEvent) {
		if (!this.lockedIn) return;
		event.preventDefault();
		const newSpeed = this.flySpeed + -event.deltaY * 0.002;
		this.flySpeed = Math.max(0.2, Math.min(20, newSpeed));
	}

	private moveEntityWithHeading(
		strafe: number,
		forward: number,
		multiplier: number,
	) {
		const DRAG_COEFFICIENT = 0.91;
		const AIR_ACCELERATION = 0.02;
		const NEGLIGLIBLE_SPEED = 0.005;
		const SPRINT_BOOST = 1.3;

		let movement = AIR_ACCELERATION;

		movement *= this.flySpeed;
		movement *= multiplier;

		if (this.keyMap["KeyE"]) movement *= SPRINT_BOOST;

		this.moveFlying(strafe, forward, movement);
		this.camera.position.x += this.motionX;
		this.camera.position.y += this.motionY;
		this.camera.position.z += this.motionZ;
		if (this.updateCallback) this.updateCallback();

		this.motionX *= DRAG_COEFFICIENT;
		this.motionY *= DRAG_COEFFICIENT;
		this.motionZ *= DRAG_COEFFICIENT;

		if (Math.abs(this.motionX) < NEGLIGLIBLE_SPEED) this.motionX = 0;
		if (Math.abs(this.motionZ) < NEGLIGLIBLE_SPEED) this.motionZ = 0;
	}

	private moveFlying(strafe: number, forward: number, friction: number) {
		let distance = strafe * strafe + forward * forward;

		if (distance >= 1e-4) {
			distance = Math.sqrt(distance);

			if (distance < 1) distance = 1;

			distance = friction / distance;

			strafe *= distance;
			forward *= distance;

			// use world direction
			this.camera.getWorldDirection(_vector);
			const yaw = -Math.atan2(_vector.x, _vector.z);
			const f1 = Math.sin(yaw);
			const f2 = Math.cos(yaw);
			this.motionX += strafe * f2 - forward * f1;
			this.motionZ += forward * f2 + strafe * f1;
		}
	}

	update(delta: number) {
		// TODO: should this be 60?
		const multiplier = delta * 60;

		// https://www.mcpk.wiki/wiki/Horizontal_Movement_Formulas
		let moveForward = 0;
		let moveStrafing = 0;
		let moveUpward = 0;

		// https://github.com/Marcelektro/MCP-919/blob/1717f75902c6184a1ed1bfcd7880404aab4da503/src/minecraft/net/minecraft/util/MovementInput.java#L4
		if (this.keyMap["KeyW"]) moveForward++;
		if (this.keyMap["KeyS"]) moveForward--;
		if (this.keyMap["KeyA"]) moveStrafing++;
		if (this.keyMap["KeyD"]) moveStrafing--;
		if (this.keyMap["Space"]) moveUpward++;
		if (this.keyMap["ShiftLeft"]) moveUpward--;

		moveForward *= 0.98;
		moveStrafing *= 0.98;

		this.moveEntityWithHeading(moveStrafing, moveForward, multiplier);

		this.motionY = ((moveUpward * this.flySpeed) / 5) * multiplier;
	}

	private connect() {
		this.domElement.ownerDocument.addEventListener(
			"mousemove",
			this.onMouseMove,
		);
		this.domElement.ownerDocument.addEventListener(
			"pointerlockchange",
			this.onPointerlockChange,
		);
		this.domElement.ownerDocument.addEventListener(
			"pointerlockerror",
			this.onPointerlockError,
		);
		this.domElement.ownerDocument.addEventListener("keydown", this.onKeyDown);
		this.domElement.ownerDocument.addEventListener("keyup", this.onKeyUp);
		this.domElement.ownerDocument.addEventListener("wheel", this.onScroll, { passive: false });
	}

	lock() {
		(async () => {
			await this.domElement.requestPointerLock();
			this.lockedIn = true;
		})();

	}

	unlock() {
		this.domElement.ownerDocument.exitPointerLock();
		this.lockedIn = false;
	}

	disconnect() {
		this.domElement.ownerDocument.removeEventListener(
			"mousemove",
			this.onMouseMove,
		);
		this.domElement.ownerDocument.removeEventListener(
			"pointerlockchange",
			this.onPointerlockChange,
		);
		this.domElement.ownerDocument.removeEventListener(
			"pointerlockerror",
			this.onPointerlockError,
		);
		this.domElement.ownerDocument.removeEventListener(
			"keydown",
			this.onKeyDown,
		);
		this.domElement.ownerDocument.removeEventListener("keyup", this.onKeyUp);
		this.domElement.ownerDocument.removeEventListener("wheel", this.onScroll);
	}

	onUpdate(callback: () => void) {
		this.updateCallback = callback;
	}

	sync(other: MinecraftControls) {
		other.onUpdate(() => {
			this.camera.position.copy(other.camera.position);
			this.camera.quaternion.copy(other.camera.quaternion);
		});
	}
}

export { MinecraftControls };
