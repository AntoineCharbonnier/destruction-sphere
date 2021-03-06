varying vec2 vUv;
uniform sampler2D tExplosion;
varying vec3 vReflect;
varying vec3 pos;
varying float ao;
varying float ao2;
varying float d;
float PI = 3.14159265358979323846264;

float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}

void main() {

  vec2 uv = vec2( 0, 1.3 * ao2 + .01 * random(vec3(12.9898,78.233,151.7182),0.0) );
  uv = clamp( uv, vec2( 0. ), vec2( 1. ) );
  vec3 color = texture2D( tExplosion, uv ).rgb;
  gl_FragColor = vec4( color.rgb, 1.0 );

}



  