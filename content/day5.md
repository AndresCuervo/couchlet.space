---
title: 05.14.2017
display: lor3m
---
<script src="../js/controls/OrbitControls.js"></script>
<script src="../js/controls/DeviceOrientationControls.js"></script>
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
        vPosition = 10.0*offset +  position;
        vec4 orientation = vec4(offset,1);
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

        float x = length( vPosition ) * 4.0;
        gl_FragColor = vColor;
    }
</script>

<div id="container"></div>

<script src="../js/scenes/day5.js"></script>
