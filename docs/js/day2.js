
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var renderer, scene, camera, stats;

var particleSystem, uniforms, geometry;

var particles = 1000;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

init();
animate();

var geo;

function init() {

	camera = new THREE.PerspectiveCamera( 40, WIDTH / HEIGHT, 1, 10000 );
	camera.position.z = 300;

	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.keys = [ 65, 83, 68 ];
	scene = new THREE.Scene();

    var g;
    var loader = new THREE.PLYLoader();
    loader.load( 'assets/models/kinectCloud.ply', function ( geometry ) {


		uniforms = {

			color:     { value: new THREE.Color( 0xffffff ) },
			texture:   { value: new THREE.TextureLoader().load( "textures/spark.png" ) }

		};

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms:       uniforms,
			vertexShader:   document.getElementById( 'vertexshader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

			blending:       THREE.AdditiveBlending,
			depthTest:      false,
			transparent:    true

		});

        g = geometry.attributes.position.array;



        particles = g.length / 3;

		var radius = 200;

		geometry = new THREE.BufferGeometry();

		var positions = new Float32Array( particles * 3 );
		var colors = new Float32Array( particles * 3 );
		var sizes = new Float32Array( particles );

		var color = new THREE.Color();

        var scale = 300;
        for ( var i = 0; i < positions.length; i += 3 ) {

            // positions
            var x = g[i];
            var y = g[i+1];
            var z = g[i+2];

            positions[ i ]     = x * scale;
            positions[ i + 1 ] = y * scale;
            positions[ i + 2 ] = z * scale;

			color.setHSL( i / particles, 1.0, 1.0 );

			colors[ i + 0 ] = color.r;
			colors[ i + 1 ] = color.g;
			colors[ i + 2 ] = color.b;

			sizes[i/3] = 15;
        }

		geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
		geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
		geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

		particleSystem = new THREE.Points( geometry, shaderMaterial );

		scene.add( particleSystem );

	    geo = geometry;
    } );

    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement );

    //

    stats = new Stats();
    container.appendChild( stats.dom );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();
	controls.update();

}

function render() {

	var time = Date.now() * 0.005;


	if (!!geo){
		var sizes = geo.attributes.size.array;
		var positions = geo.attributes.position.array;

		for ( var i = 0; i < particles; i++ ) {

			//sizes[ i ] = 10 * ( 1 + Math.sin(  i + time ) );
			positions[i*3 + 0] = positions[i*3 + 0] + ((time+positions[i*3+1]*.1) % 5 - 2.5);

		}

		geo.attributes.position.needsUpdate = true;
	}

	renderer.render( scene, camera );

}

