let glslify = require('glslify');

class Sphere {

  constructor() {

    this.vertexShader   = glslify('../../vertex-shaders/smooth-noise.vert');
    this.fragmentShader = glslify('../../fragment-shaders/example.frag');

    this.meshGeometry = new THREE.SphereGeometry( 5, 16, 16 );

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

      var d = 5 * ( 0.5 - Math.random() );

      for ( var i = 0; i < 3; i ++ ) {

        colors[ index + ( 3 * i )     ] = color.r;
        colors[ index + ( 3 * i ) + 1 ] = color.g;
        colors[ index + ( 3 * i ) + 2 ] = color.b;

        displacement[ index + ( 3 * i )     ] = d;
        displacement[ index + ( 3 * i ) + 1 ] = d;
        displacement[ index + ( 3 * i ) + 2 ] = d;

      }

    }


    // LIGHTS

    // var ambient = new THREE.AmbientLight( 0x050505 );
    // scene.add( ambient );

    // directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
    // directionalLight.position.set( 2, 1.2, 10 ).normalize();
    // scene.add( directionalLight );

    // directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    // directionalLight.position.set( - 2, 1.2, -10 ).normalize();
    // scene.add( directionalLight );

    // pointLight = new THREE.PointLight( 0xffaa00, 2 );
    // pointLight.position.set( 2000, 1200, 10000 );
    // scene.add( pointLight );



    //  TEXTURE
    var r    = "img/";
    var urls = [ 
      r + "posx.jpg", r + "negx.jpg",
      r + "posy.jpg", r + "negy.jpg",
      r + "posz.jpg", r + "negz.jpg" 
    ];

    var textureCube = THREE.ImageUtils.loadTextureCube( urls );
    var mlib = {
      
      "Orange":   new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
      "Blue":   new THREE.MeshLambertMaterial( { color: 0x001133, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
      "Red":    new THREE.MeshLambertMaterial( { color: 0x660000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
      "Black":  new THREE.MeshLambertMaterial( { color: 0x000000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.15 } ),
      "White":  new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
      
      "Carmine":  new THREE.MeshPhongMaterial( { color: 0x770000, specular:0xffaaaa, envMap: textureCube, combine: THREE.MultiplyOperation } ),
      "Gold":   new THREE.MeshPhongMaterial( { color: 0xaa9944, specular:0xbbaa99, shininess:50, envMap: textureCube, combine: THREE.MultiplyOperation } ),
      "Bronze": new THREE.MeshPhongMaterial( { color: 0x150505, specular:0xee6600, shininess:10, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
      "Chrome":   new THREE.MeshPhongMaterial( { color: 0xffffff, specular:0xffffff, envMap: textureCube, combine: THREE.MultiplyOperation } ),
      
      "Orange metal": new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: textureCube, combine: THREE.MultiplyOperation } ),
      "Blue metal":   new THREE.MeshLambertMaterial( { color: 0x001133, envMap: textureCube, combine: THREE.MultiplyOperation  } ),
      "Red metal":  new THREE.MeshLambertMaterial( { color: 0x770000, envMap: textureCube, combine: THREE.MultiplyOperation } ),
      "Green metal":  new THREE.MeshLambertMaterial( { color: 0x007711, envMap: textureCube, combine: THREE.MultiplyOperation } ),
      "Black metal":  new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube, combine: THREE.MultiplyOperation } ),
      
      "Pure chrome":  new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube } ),
      "Dark chrome":  new THREE.MeshLambertMaterial( { color: 0x444444, envMap: textureCube } ),
      "Darker chrome":new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube } ),
      
      "Black glass":  new THREE.MeshLambertMaterial( { color: 0x101016, envMap: textureCube, opacity: 0.975, transparent: true } ),
      "Dark glass": new THREE.MeshLambertMaterial( { color: 0x101046, envMap: textureCube, opacity: 0.25, transparent: true } ),
      "Blue glass": new THREE.MeshLambertMaterial( { color: 0x668899, envMap: textureCube, opacity: 0.75, transparent: true } ),
      "Light glass":  new THREE.MeshBasicMaterial( { color: 0x223344, envMap: textureCube, opacity: 0.25, transparent: true, combine: THREE.MixOperation, reflectivity: 0.25 } ),
      
      "Red glass":  new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.75, transparent: true } ),
      "Yellow glass": new THREE.MeshLambertMaterial( { color: 0xffffaa, opacity: 0.75, transparent: true } ),
      "Orange glass": new THREE.MeshLambertMaterial( { color: 0x995500, opacity: 0.75, transparent: true } ),
      
      "Orange glass 50":  new THREE.MeshLambertMaterial( { color: 0xffbb00, opacity: 0.5, transparent: true } ),
      "Red glass 50":   new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),
      
      "Fullblack rough":  new THREE.MeshLambertMaterial( { color: 0x000000 } ),
      "Black rough":    new THREE.MeshLambertMaterial( { color: 0x050505 } ),
      "Darkgray rough": new THREE.MeshLambertMaterial( { color: 0x090909 } ),
      "Red rough":    new THREE.MeshLambertMaterial( { color: 0x330500 } ),
      
      "Darkgray shiny": new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } ),
      "Gray shiny":   new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } )

    };



    this.geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    this.geometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );

    this.explode = 1.0

    this.uniforms = {

      amplitude: { type: "f", value: 0.0 },
      time: { type: "f", value: 0 },
      weight: { type: "f", value: 0 },
      opacity: { type: 'f', value: 1.0 } ,
      explode: { type: 'f', value: this.explode}

    };

    this.meshMaterial = new THREE.ShaderMaterial( {

      uniforms:       this.uniforms,
      vertexShader:   this.vertexShader,
      fragmentShader: this.fragmentShader,
      // wireframe: true,
      // wireframeLinewidth: 1
    });

    this.meshMaterial2 = mlib["Bronze"]
    
    // this.materials  = [this.meshMaterial, this.meshMaterial2]

    this.mesh = new THREE.Object3D()

    this.mesh.add( new THREE.Mesh(
      this.geometry,
      this.meshMaterial
    ));

    // this.mesh.add( THREE.SceneUtils.createMultiMaterialObject(this.geometry, this.materials) )

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
    this.weight          = 0.05;
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

    this.meshMaterial.uniforms[ 'opacity' ].value  = 1.0;
    this.meshMaterial.uniforms[ 'explode' ].value  = this.explode;
    this.meshMaterial.uniforms[ 'time' ].value        = this.speed * ( Date.now() - this.clock );
    this.meshMaterial.uniforms[ 'weight' ].value      = this.weight;


    if(this.explode == 0.0){
      this.amplitude = 0
    }

    this.amplitude+= this.step

    this.meshMaterial.uniforms.amplitude.value = this.amplitude;
    // this.meshMaterial.uniforms.amplitude.value = Math.min(Math.max(1.0 + Math.sin( ts * 0.0005 ), 0), 1);

  }

  getMesh() {
    return this.mesh;
  }

}

export { Sphere };