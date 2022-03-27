precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 UV;

void main(void){
	vec2 position = UV * 1. - 1.;
	
	float red = abs( 
		sin(position.x * position.y + u_time )
	);
	float green = abs( 
		sin(position.x + u_time) 
	);
	float blue = abs( 
		sin(position.x * position.y + u_time*10.) 
	);

	gl_FragColor=vec4(red, green, blue, 1.0);
}