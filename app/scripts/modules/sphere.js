let glslify = require('glslify');

class Sphere {

  constructor() {
    this.vertexShader   = glslify('../../vertex-shaders/example.vert');
    this.fragmentShader = glslify('../../fragment-shaders/example.frag');

    this.meshGeometry = new THREE.SphereGeometry( 5, 32, 32 );

    this.tessellateModifier = new THREE.TessellateModifier( 8 );

    for ( var i = 0; i < 6; i ++ ) {

      this.tessellateModifier.modify( this.meshGeometry );

    }

    this.explodeModifier = new THREE.ExplodeModifier();
    this.explodeModifier.modify( this.meshGeometry );
    
    var numFaces     = this.meshGeometry.faces.length;
    
    
    this.geometry    = new THREE.BufferGeometry().fromGeometry( this.meshGeometry );
    
    var colors       = new Float32Array( numFaces * 3 * 3 );
    var displacement = new Float32Array( numFaces * 3 * 3 );
    
    var color        = new THREE.Color();

    for ( var f = 0; f < numFaces; f ++ ) {

      var index = 9 * f;

      var h = 0.2 * Math.random();
      var s = 0.5 + 0.5 * Math.random();
      var l = 0.5 + 0.5 * Math.random();

      color.setHSL( h, s, l );

      var d = 10 * ( 0.5 - Math.random() );

      for ( var i = 0; i < 3; i ++ ) {

        colors[ index + ( 3 * i )     ] = color.r;
        colors[ index + ( 3 * i ) + 1 ] = color.g;
        colors[ index + ( 3 * i ) + 2 ] = color.b;

        displacement[ index + ( 3 * i )     ] = d;
        displacement[ index + ( 3 * i ) + 1 ] = d;
        displacement[ index + ( 3 * i ) + 2 ] = d;

      }

    }


    this.geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    this.geometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );

    //

    this.uniforms = {

      amplitude: { type: "f", value: 0.0 }

    };

    this.meshMaterial = new THREE.ShaderMaterial( {

      uniforms:       this.uniforms,
      vertexShader:   this.vertexShader,
      fragmentShader: this.fragmentShader

    });

    this.mesh = new THREE.Object3D()

    this.mesh.add( new THREE.Mesh(
      this.geometry,
      this.meshMaterial
    ));

    this.mesh.position.y = 0;
    this.mesh.position.z = -15;

    this.data = {
      radius : 10,
      tube : 3,
      radialSegments : 64,
      tubularSegments : 8,
      p : 2,
      q : 3,
      heightScale : 1
    };
    this.clock           = Date.now();
    
    this.speed           = 0.0003;
    this.weight          = 5;
    this.opacity         = 0.0;

    this.step = 0.001
    this.amplitude = 0

    return this;
  }

  update( ts ) {
    // console.log(1.0 + (Math.sin( ts * 0.0005 )))
    // this.meshMaterial.uniforms[ 'time' ].value = this.speed * ( Date.now() - this.clock );
    // console.log(this.amplitude)
    if(this.amplitude > 0.2 || this.amplitude < 0){
      this.step = -this.step
    }


    this.amplitude+= this.step

    this.meshMaterial.uniforms.amplitude.value = this.amplitude;
    // this.meshMaterial.uniforms.amplitude.value = Math.min(Math.max(1.0 + Math.sin( ts * 0.0005 ), 0), 1);

  }

  setWeight( _weight ) {
    this.weight = _weight;
  }

  getSoundDataWave(){
    return this.waveData;
  }

  getSoundDataBar(){
    return this.barData;
  }

  getMesh() {
    return this.mesh;
  }

}

export { Sphere };