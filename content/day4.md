---
title: 05.13.2017
display: hdge⎋hog
---

<div id="container"></div>
<div id="info">
    <div id="notSupported" style="display:none">Sorry your graphics card + browser does not support hardware instancing</div>
</div>

<script src="../js/three85.js"></script>
<script src="../js/utils/dat.gui.min.js"></script>
<script src="../js/utils/Detector.js"></script>
<script src="../js/utils/stats.min.js"></script> <!-- TODO move this in future -->
<script src="../js/loaders/PLYLoader.js"></script>
<script src="../js/effects/StereoEffect.js"></script>

<script id="vertexShader" type="x-shader/x-vertex">
    precision highp float;

    uniform float sineTime;
    uniform float range;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    attribute vec3 position;
    attribute vec3 offset;
    attribute vec4 color;
    attribute vec4 orientationStart;
    attribute vec4 orientationEnd;

    varying vec3 vPosition;
    varying vec4 vColor;

    void main(){
        vPosition = offset + range * position;
        vec4 orientation = mix(vec4(offset,1), normalize(orientationStart),range);
        vec3 vcV = cross(orientation.xyz, vPosition);
        vPosition = vcV * (2.0 * orientation.w) + (cross(orientation.xyz, vcV) * 2.0 + vPosition);

        vColor = color;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );

    }

</script>

<script id="fragmentShader" type="x-shader/x-fragment">

    precision highp float;

    uniform float time;

    varying vec3 vPosition;
    varying vec4 vColor;

    void main() {

        vec4 color = vec4( vColor );
        //color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

        gl_FragColor = color;
    }
</script>
<script src="../js/scenes/day4.js"></script>
