if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var renderer, scene, camera, stats, effect;

var particleSystem, uniforms, geometry;

var particles = 1000;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var flashPoints = { 'on' : false };

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

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
    loader.load( 'assets/models/moss-garden-cloud-tiny-2.ply', function ( geometry ) {


        uniforms = {

            color:     { value: new THREE.Color( 0xffffff ) },
            texture:   { value: new THREE.TextureLoader().load( "textures/spark.png" ) }

        };

        var shaderMaterial = new THREE.ShaderMaterial( {

            uniforms:       uniforms,
            vertexShader:   document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

            blending:       THREE.NormalBlending,
            depthTest:      true,
            transparent:    true,


        });

        g = geometry.attributes.position.array;
        c = geometry.attributes.color.array;

        console.log(geometry);
        particles = g.length / 3;

        var radius = 3;

        geometry = new THREE.BufferGeometry();

        var positions = new Float32Array( particles * 3 );
        var colors = new Float32Array( particles * 3 );
        var sizes = new Float32Array( particles );

        var color = new THREE.Color();

        var scale = 800;
        for ( var i = 0; i < positions.length; i += 3 ) {

            // positions
            var x = g[i];
            var y = g[i+1];
            var z = g[i+2];

            positions[ i ]     = x * scale;
            positions[ i + 1 ] = y * scale;
            positions[ i + 2 ] = z * scale;

            colors[ i + 0 ] = c[ i ];
            colors[ i + 1 ] = c[ i + 1];
            colors[ i + 2 ] = c[ i + 2];

            sizes[i/3] = 1;
        }

        geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

        particleSystem = new THREE.Points( geometry, shaderMaterial );

        scene.add( particleSystem );

        geo = geometry;


        var width = window.innerWidth || 2;
        var height = window.innerHeight || 2;
        effect = new THREE.AnaglyphEffect( renderer );
        effect.setSize( width, height )
    } );

    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

    window.onload = function() {
        var gui = new dat.GUI();
        gui.add(flashPoints, 'on');
    };

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    effect.setSize( window.innerWidth, window.innerHeight );


}

function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX ) / 100;
    mouseY = ( event.clientY - windowHalfY ) / 100;
}


function animate() {

    requestAnimationFrame( animate );

    render();
    stats.update();
    controls.update();

}

function render() {

    // var x = event.clientX;
    // var y = event.clientY;
    //
    // console.log(x, y);

    var time = Date.now() * 0.005;



    var range = .1;
    if (!!geo){
        var sizes = geo.attributes.size.array;
        var positions = geo.attributes.position.array;

        for ( var i = 0; i < particles; i++ ) {


            //sizes[ i ] = 10 * ( 1 + Math.sin(  i + time ) );
            positions[i*3 + 0] = positions[i*3 + 0] +
                ((time+positions[i*3+1]*.1) % (range) - (range/2.0));

        }

        geo.attributes.position.needsUpdate = true;
    }

    if (flashPoints.on){
        effect.render( scene, camera );
    } else {
        renderer.render( scene, camera );
    }


}

