// fragment shader

precision mediump float;

uniform float opacity;

uniform float thickness;
uniform float height;
uniform float offset;

varying vec2 vUv;
void main() {
	float alpha = (step(abs(vUv.x - 0.5), thickness)) * step(abs(vUv.y - 0.5), height + offset) * step(offset, abs(vUv.y - 0.5)) + (step(abs(vUv.y - 0.5), thickness)) * step(abs(vUv.x - 0.5), height + offset) * step(offset, abs(vUv.x - 0.5));
	gl_FragColor = vec4( 1.0, 1.0, 1.0, alpha * opacity);
}