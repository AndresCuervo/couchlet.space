// Global so you can pass em along 😬
var points, geo, oPositions;
var flashPoints = false;
var guiData = {
    'anaglyphOn' : false,
    'delta' : 130,
    'particleSize' : 1
};
AFRAME.registerComponent('make-point-cloud', {
    init: function () {

        // camera = new THREE.PerspectiveCamera( 40, WIDTH / HEIGHT, 1, 10000 );
        // camera.position.z = 300;
        //
        animate();
        var stats;

        var scene = document.querySelector('a-scene').object3D
        var loader = new THREE.PLYLoader();
        loader.load( 'assets/models/apse-simple.ply', function ( geometry ) {


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

            c = geometry.attributes.normal.array;

            console.log(geometry);
            particles = g.length / 3;

            var radius = 3;

            geometry = new THREE.BufferGeometry();

            var positions = new Float32Array( particles * 3 );
            var colors = new Float32Array( particles * 3 );
            var normals=  new Float32Array( particles * 3);
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


                normals[ i ]     = c[i + 0];
                normals[ i + 1 ] = c[i + 1];
                normals[ i + 2 ] = c[i + 2];

                var avg = (c[ i ] + c[ i + 1] + c[ i + 2]) / 3;
                colors[ i + 0 ] = 1;
                colors[ i + 1 ] = 1;
                colors[ i + 2 ] = 1;

                sizes[i/3] = guiData.particleSize;
            }

            oPositions = positions.slice();

            geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
            geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
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

        // Note: controls should be here, AFTER renderer gets declared, so that
        // it's position normally.
        //
        // see: http://stackoverflow.com/a/33359046
        // -----
        // Also, this one is p important and has context around mrdoob's intended
        // use of dat.gui & trackball controls
        //
        // https://github.com/mrdoob/three.js/issues/828
        // controls = new THREE.TrackballControls(renderer.domElement);
        // controls.rotateSpeed = 1.0;
        // controls.zoomSpeed = 1.2;
        // controls.panSpeed = 0.8;
        // controls.noZoom = false;
        // controls.noPan = false;
        // controls.staticMoving = true;
        // controls.dynamicDampingFactor = 0.3;
        // controls.keys = [ 65, 83, 68 ];


        stats = new Stats();
        container.appendChild( stats.dom );

        window.onload = function() {
            var gui = new dat.GUI();
            gui.add(guiData, 'anaglyphOn');
            gui.add(guiData, 'delta', 0, 1000);
            gui.add(guiData, 'particleSize', 0, 10);
        };

        // window.addEventListener( 'resize', onWindowResize, false );

        function animate() {
            // console.log("hello");
            requestAnimationFrame( animate );
            render();
            if (stats) {
            stats.update();
            }
        }

        function render() {
            var time = document.querySelector('a-scene').time * 0.001;
            var camDirection = document.querySelector('a-camera').object3D.getWorldDirection();

            var scale = guiData.delta;

            var range = .1;
            if (!!geo){
                var sizes = geo.attributes.size.array;
                var positions = geo.attributes.position.array;
                var normals =   geo.attributes.normal.array;

                for ( var i = 0; i < particles; i++ ) {
                    var x = positions[i*3];
                    var y = positions[i*3 + 1];
                    var z = positions[i*3 + 2];
                    var nx = normals[i*3];
                    var ny = normals[i*3 + 1];
                    var nz = normals[i*3 + 2];

                    var dot = camDirection.x * nx + camDirection.y * ny + camDirection.z * nz;
                    // dot *= scale;
                    dot *= guiData.delta * Math.sin(y * .01 + time);

                    positions[i*3 + 0] = oPositions[i*3 + 0] + dot * nx;
                    positions[i*3 + 1] = oPositions[i*3 + 1] + dot * ny;
                    positions[i*3 + 2] = oPositions[i*3 + 2] + dot * nz;

                    sizes[ i ] = guiData.particleSize;
                    // positions[i*3 + 0] = positions[i*3 + 0] +
                    //     ((time+positions[i*3+1]*.1) % (range) - (range/2.0));

                }

                geo.attributes.position.needsUpdate = true;
                geo.attributes.size.needsUpdate = true;
            }
        }

        document.querySelector('.a-enter-vr-button').click();
    }
});
