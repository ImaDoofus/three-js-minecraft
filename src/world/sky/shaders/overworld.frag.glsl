// fragment shader

precision mediump float;

uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;

varying vec3 vPosition;

void main () {
	float h = clamp(pow(max(vPosition.y + offset, 0.0), exponent), 0.0, 1.0);
	gl_FragColor = vec4( mix( bottomColor, topColor, h), 1.0 );
}