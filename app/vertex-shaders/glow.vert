uniform vec3 viewVector;
uniform float c;
uniform float p;
varying float intensity;
void main() 
{
    vec3 vNormal = normalize( normalMatrix * normal );
    vec3 vNormel = normalize( normalMatrix * viewVector );
    // incorrect intensity = pow( c - dot(vNormal, vNormel), p );
    intensity = pow( abs(c - dot(vNormal, vNormel) ), p );

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}