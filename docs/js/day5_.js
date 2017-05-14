if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;

var camera, scene, renderer, controls;
var particleLight;

var loader = new THREE.FontLoader();
loader.load( 'fonts/gentilis_regular.typeface.json', function ( font ) {

    init( font );
    animate();

} );

function init( font ) {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 0.0, 400, 400 * 3.5 );

        scene = new THREE.Scene();

        // Materials

    var imgTexture = new THREE.TextureLoader().load( "textures/planets/moon_1024.jpg" );
    imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
    imgTexture.anisotropy = 16;
    imgTexture = null;

    var shininess = 50, specular = 0x333333, bumpScale = 1, shading = THREE.SmoothShading;

    var materials = [];

    var cubeWidth = 400;
    var numberOfSphersPerSide = 5;
    var sphereRadius = ( cubeWidth / numberOfSphersPerSide ) * 0.8 * 0.5;
    var stepSize = 1.0 / numberOfSphersPerSide;

    var geometry = new THREE.SphereBufferGeometry( sphereRadius, 32, 16 );

    for ( var alpha = 0, alphaIndex = 0; alpha <= 1.0; alpha += stepSize, alphaIndex ++ ) {

        var specularShininess = Math.pow( 2, alpha * 10 );

        for ( var beta = 0; beta <= 1.0; beta += stepSize ) {

            var specularColor = new THREE.Color( beta * 0.2, beta * 0.2, beta * 0.2 );

            for ( var gamma = 0; gamma <= 1.0; gamma += stepSize ) {

                // basic monochromatic energy preservation
                var diffuseColor = new THREE.Color().setHSL( alpha, 0.5, gamma * 0.5 ).multiplyScalar( 1 - beta * 0.2 );

                var material = new THREE.MeshPhongMaterial( {
                    map: imgTexture,
                    bumpMap: imgTexture,
                    bumpScale: bumpScale,
                    color: diffuseColor,
                    specular: specularColor,
                    reflectivity: beta,
                    shininess: specularShininess,
                    shading: THREE.SmoothShading,
                    envMap: null
                } );

                var mesh = new THREE.Mesh( geometry, material );

                mesh.position.x = alpha * 400 - 200;
                mesh.position.y = beta * 400 - 200;
                mesh.position.z = gamma * 400 - 200;

                scene.add( mesh );

            }

        }

    }

    function addLabel( name, location ) {

        var textGeo = new THREE.TextGeometry( name, {

            font: font,

            size: 20,
            height: 1,
            curveSegments: 1

        });

        var textMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        var textMesh = new THREE.Mesh( textGeo, textMaterial );
        textMesh.position.copy( location );
        scene.add( textMesh );

    }

    addLabel( "-shininess", new THREE.Vector3( -350, 0, 0 ) );
    addLabel( "+shininess", new THREE.Vector3( 350, 0, 0 ) );

    addLabel( "-specular, -reflectivity", new THREE.Vector3( 0, -300, 0 ) );
    addLabel( "+specular, +reflectivity", new THREE.Vector3( 0, 300, 0 ) );

    addLabel( "-diffuse", new THREE.Vector3( 0, 0, -300 ) );
    addLabel( "+diffuse", new THREE.Vector3( 0, 0, 300 ) );

    particleLight = new THREE.Mesh( new THREE.SphereBufferGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
    scene.add( particleLight );

    // Lights

    scene.add( new THREE.AmbientLight( 0x222222 ) );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 1, 1, 1 ).normalize();
    scene.add( directionalLight );

    var pointLight = new THREE.PointLight( 0xffffff, 2, 800 );
    particleLight.add( pointLight );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    //

    stats = new Stats();
    container.appendChild( stats.dom );

    controls = new THREE.OrbitControls( camera );
    controls.target.set( 0, 0, 0 );
    controls.update();

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );

    stats.begin();
    render();
    stats.end();

}

function render() {

    var timer = Date.now() * 0.00025;

    //camera.position.x = Math.cos( timer ) * 800;
    //camera.position.z = Math.sin( timer ) * 800;

    camera.lookAt( scene.position );

    particleLight.position.x = Math.sin( timer * 7 ) * 300;
    particleLight.position.y = Math.cos( timer * 5 ) * 400;
    particleLight.position.z = Math.cos( timer * 3 ) * 300;

    renderer.render( scene, camera );

}


