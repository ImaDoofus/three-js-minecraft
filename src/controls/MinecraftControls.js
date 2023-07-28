import { Euler, Vector3 } from "three";

const _euler = new Euler(0, 0, 0, "YXZ");
const _vector = new Vector3();
const _PI_2 = Math.PI / 2;

class MinecraftControls {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.isLocked = false;

    // Set to constrain the pitch of the camera
    // Range is 0 to Math.PI radians
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    this.pointerSpeed = 1;

    // keyboard controls
    this.keyMap = {};

    // movement
    this.tick = 0;
    this.motionX = 0;
    this.motionY = 0;
    this.motionZ = 0;
    this.moveForward = 0;
    this.moveStrafing = 0;

    // MOVEMENT_MULTIPLIER
    // 1.3 = sprinting
    // 1.0 = walking
    // 0.3 = sneaking
    // 0.0 = stopping

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onPointerlockChange = this.onPointerlockChange.bind(this);
    this.onPointerlockError = this.onPointerlockError.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.connect();
  }
  onMouseMove(event) {
    if (!this.isLocked) return;

    const movementX =
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY =
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    _euler.setFromQuaternion(this.camera.quaternion);

    _euler.y -= movementX * 0.002 * this.pointerSpeed;
    _euler.x -= movementY * 0.002 * this.pointerSpeed;

    _euler.x = Math.max(
      _PI_2 - this.maxPolarAngle,
      Math.min(_PI_2 - this.minPolarAngle, _euler.x)
    );

    this.camera.quaternion.setFromEuler(_euler);
  }
  onPointerlockChange() {
    if (this.domElement.ownerDocument.pointerLockElement === this.domElement)
      this.isLocked = true;
    else this.isLocked = false;
  }
  onPointerlockError() {
    console.error("Unable to use Pointer Lock API");
  }

  onKeyDown(event) {
    this.keyMap[event.code] = true;
  }
  onKeyUp(event) {
    this.keyMap[event.code] = false;
  }

  moveEntityWithHeading(forward, strafe) {
    const DRAG_COEFFICIENT = 0.91;
    const AIR_ACCELERATION = 0.05; // not to be confused with 0.02 value
    const NEGLIGLIBLE_SPEED = 0.005;
    const SPRINT_BOOST = 1.3;

    let movement = AIR_ACCELERATION;
    if (this.keyMap["KeyE"]) movement *= SPRINT_BOOST;

    this.updateMotionXZ(forward, strafe, movement);

    this.motionX *= DRAG_COEFFICIENT;
    this.motionZ *= DRAG_COEFFICIENT;

    if (Math.abs(this.motionX) < NEGLIGLIBLE_SPEED) this.motionX = 0;
    if (Math.abs(this.motionZ) < NEGLIGLIBLE_SPEED) this.motionZ = 0;
  }

  updateMotionXZ(forward, strafe, movementFactor) {
    let distance = forward * forward + strafe * strafe;

    if (distance >= 1e-4) {
      distance = Math.sqrt(distance);

      if (distance < 1) distance = 1;

      distance = movementFactor / distance;

      strafe *= distance;
      forward *= distance;

      // use world direction
      this.camera.getWorldDirection(_vector);
      const yaw = Math.atan2(_vector.x, _vector.z);
      const sinYaw = Math.sin(yaw);
      const cosYaw = Math.cos(yaw);
      this.motionX += forward * sinYaw - strafe * cosYaw;
      this.motionZ += forward * cosYaw + strafe * sinYaw;
    }
  }

  update(delta) {
    // linear interpolation
    let factor = delta * 20;

    this.camera.position.x += this.motionX * factor;
    this.camera.position.z += this.motionZ * factor;
    this.camera.position.y += this.motionY * factor;
  }

  _tick() {
    // https://www.mcpk.wiki/wiki/Horizontal_Movement_Formulas

    this.moveForward = 0;
    this.moveStrafing = 0;
    this.moveUpward = 0;

    if (this.keyMap["KeyW"]) this.moveForward++;
    if (this.keyMap["KeyS"]) this.moveForward--;
    if (this.keyMap["KeyA"]) this.moveStrafing--;
    if (this.keyMap["KeyD"]) this.moveStrafing++;
    if (this.keyMap["Space"]) this.moveUpward++;
    if (this.keyMap["ShiftLeft"]) this.moveUpward--;

    // no idea why 0.98
    this.moveForward *= 0.98;
    this.moveStrafing *= 0.98;

    this.moveEntityWithHeading(this.moveForward, this.moveStrafing);

    this.motionY = this.moveUpward * 0.6;

    this.update(1 / 20);
  }

  // update() {
  // 	// player's previous velocity
  // 	let prevVelX = this.motionX;
  // 	let prevVelZ = this.motionZ;

  // 	// slipperiness multiplier (assume 1 for airborne players)
  // 	let slipMult = 1;

  // 	// movement multiplier (assume 1 for default and walking)
  // 	let moveMult = 1;

  // 	// use world direction
  // 	const cameraRotation = new Vector3();
  // 	this.camera.getWorldDirection(cameraRotation);
  // 	const yaw = Math.atan2(cameraRotation.x, cameraRotation.z);

  // 	// calculate new velocity in X direction
  // 	let newVelX = prevVelX * slipMult * 0.91 + 0.02 * moveMult * Math.sin(yaw);
  // 	this.motionX = newVelX;

  // 	// calculate new velocity in Z direction
  // 	let newVelZ = prevVelZ * slipMult * 0.91 + 0.02 * moveMult * Math.cos(yaw);
  // 	this.motionZ = newVelZ;

  // 	this.camera.position.x += this.motionX;
  // 	this.camera.position.z += this.motionZ;
  // }

  connect() {
    // mouse
    this.domElement.ownerDocument.addEventListener(
      "mousemove",
      this.onMouseMove
    );
    this.domElement.ownerDocument.addEventListener(
      "pointerlockchange",
      this.onPointerlockChange
    );
    this.domElement.ownerDocument.addEventListener(
      "pointerlockerror",
      this.onPointerlockError
    );

    // keyboard
    this.domElement.ownerDocument.addEventListener("keydown", this.onKeyDown);
    this.domElement.ownerDocument.addEventListener("keyup", this.onKeyUp);
  }
  disconnect() {
    // mouse
    this.domElement.ownerDocument.removeEventListener(
      "mousemove",
      this.onMouseMove
    );
    this.domElement.ownerDocument.removeEventListener(
      "pointerlockchange",
      this.onPointerlockChange
    );
    this.domElement.ownerDocument.removeEventListener(
      "pointerlockerror",
      this.onPointerlockError
    );

    // keyboard
    this.domElement.ownerDocument.removeEventListener(
      "keydown",
      this.onKeyDown
    );
    this.domElement.ownerDocument.removeEventListener("keyup", this.onKeyUp);
  }
  getDirection() {
    return new Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
  }
  // moveForward(distance) {
  // 	_vector.setFromMatrixColumn(this.camera.matrix, 0);
  // 	_vector.crossVectors(this.camera.up, _vector);
  // 	this.camera.position.addScaledVector(_vector, distance);
  // }
  // moveRight(distance) {
  // 	_vector.setFromMatrixColumn(this.camera.matrix, 0);
  // 	this.camera.position.addScaledVector(_vector, distance);
  // }
  // moveUp(distance) {
  // 	_vector.setFromMatrixColumn(this.camera.matrix, 1);
  // 	this.camera.position.addScaledVector(_vector, distance);
  // }
  lock() {
    this.domElement.requestPointerLock();
  }
  unlock() {
    this.domElement.ownerDocument.exitPointerLock();
  }
  dispose() {
    this.disconnect();
  }
}

export { MinecraftControls };
