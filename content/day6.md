---
title: 05.16.2017
display: π1p
---
<script src="../js/three.js"></script>
<script src="../js/controls/OrbitControls.js"></script>
<script src="../js/controls/DeviceOrientationControls.js"></script>

<script src="../js/utils/dat.gui.min.js"></script>
<script src="../js/loaders/PLYLoader.js"></script>
<script src="../js/effects/StereoEffect.js"></script>

<script src="../js/Detector.js"></script>
<script src="../js/stats.min.js"></script>

<script id="vertexShader" type="x-shader/x-vertex">
	varying float depth;
	varying float z_coord;
	uniform float center_x;
	uniform float center_y;
	uniform float time;

	void main() {
		
		float scale = (sin(time*0.2)+1.0)*.01 + .004;
		float height = 200.0;
		vec3 vertex = position;
		
		vertex.z += exp(-(pow((vertex.x-center_x)*scale, 2.0) + pow((vertex.y-center_y)*scale, 2.0))) * height;
		vec4 cs_pos = projectionMatrix * modelViewMatrix * vec4( vertex, 1.0 );
		depth = cs_pos.z * .001;
		
		z_coord = vertex.x;
		gl_Position = cs_pos;
	}
</script>

<script id="fragmentShader" type="x-shader/x-fragment">
	varying float depth;
	varying float z_coord;
	uniform float time;
	
	void main() {
		float proportion = (sin(time*.01)+1.0)*2.5+5.0;
		float speed = 4.0;
		float shit = step(mod(z_coord+time*speed, proportion), 1.0);
		float c = shit;
		gl_FragColor = vec4(c,c,c,1.);

	}
</script>

<div id="container"></div>

<script src="../js/day6.js"></script>
