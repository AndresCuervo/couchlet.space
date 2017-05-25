---
title: 05.16.2017
display: π1p
---
<script src="../js/controls/DeviceOrientationControls.js"></script>
<script src="../js/controls/OrbitControls.js"></script>
<script src="../js/effects/StereoEffect.js"></script>
<script src="../js/utils/orientation.js"></script>

<script id="vertexShader" type="x-shader/x-vertex">
	varying float depth;
	varying vec3 v_pos;
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

		v_pos = vertex;
		gl_Position = cs_pos;
	}
</script>

<script id="fragmentShader" type="x-shader/x-fragment">
	varying float depth;
	varying vec3 v_pos;
	uniform float time;

	void main() {
		float proportion = (sin(time*.01)+1.0)*2.5+5.0;
		float speed = 4.0;
		float shit = step(mod(v_pos.z+time*speed, proportion), 1.0);

		float c = shit;

        if (v_pos.z < 10.0){
            c = 0.0;
        }

		gl_FragColor = vec4(c,c,c,1.);

	}
</script>

<div id="container"></div>

<script src="../js/scenes/day6.js"></script>
