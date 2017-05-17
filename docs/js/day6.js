if ( !Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;
var camera, scene, renderer, effect;
var mesh;

var gui = new dat.GUI();

var guiData = {
    'stereo' : false
};

var mouse = {x: 0, y: 0};

function init() {
	gui.add( guiData, "stereo");
    container = document.getElementById( 'container' );
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, .01, 1000000 );
    camera.position.x = 0;
    camera.position.y = -500;
    camera.position.z = 500;
	//camera.up = new THREE.Vector3(1,0,0);
	camera.lookAt(new THREE.Vector3(0,0,0));
    // camera.position.z = 60;


    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbbaaee );

    // geometry
	var geometry = new THREE.PlaneGeometry(2500, 2500, 100, 100);
	//var geometry = new THREE.RingGeometry( .001, 5000, 200 );
	//var geometry = new THREE.TorusKnotGeometry( 1000, 300, 100, 100 );
	
	var material = new THREE.ShaderMaterial( {

		uniforms: {
			time: { value: 1.0 },
			center_x: { value: 0.0},
			center_y: { value: 0.0}
		},

		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent

	} );
	
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh)

    renderer = new THREE.WebGLRenderer();

    if ( renderer.extensions.get( 'ANGLE_instanced_arrays' ) === false ) {
        document.getElementById( "notSupported" ).style.display = "";
        return;
    }

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    effect = new THREE.StereoEffect( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );

    stats = new Stats();
    container.appendChild( stats.dom );

    window.addEventListener( 'resize', onWindowResize, false );
	
    // Controls
    // var orientationControls= new THREE.DeviceOrientationControls( camera );
    // controls = new THREE.OrbitControls( camera );
    // controls.target.set( 0, 0, 0 );
    // controls.update();
	
	window.addEventListener('mousemove', onMouseMove, false);
}

function onWindowResize( event ) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

// Follows the mouse event
function onMouseMove(event) {
	// Update the mouse variable
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	mouse.x *= 400.0;
	mouse.y *= 400.0;
}

function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
}



function render() {
    var time = performance.now();
	
	mesh.material.uniforms.time.value = time * 0.005;
	mesh.material.uniforms.center_x.value = mouse.x;
	mesh.material.uniforms.center_y.value = ((-time*.004) % 5.0)*500.0+1500.0;
    if (guiData.stereo) {
        effect.render( scene, camera );
    } else {
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render( scene, camera );
    }
}


init();
animate();
