---
title: 06.11.17
display: 🎈📈
---
<!-- <script src="../js/a-frame/0.5.0/aframe.min.js"></script> -->
<script src="../js/a-frame/0.6.0beta.min.js"></script>
<script src="../js/loaders/PLYLoader.js"></script>
<script src="../js/utils/a-frame-loading-bar.js"></script>
<!-- Necessary for the Jade plugin -->
<!--  <script src="https://cdnjs.cloudflare.com/ajax/libs/jade/1.11.0/jade.min.js"> -->
<script src="//cdn.rawgit.com/donmccurdy/aframe-extras/v3.8.3/dist/aframe-extras.min.js"></script>
<script src="../js/a-frame/aframe-animation-component.min.my_v1.js"></script>
<script src="https://unpkg.com/aframe-template-component@^3.2.1/dist/aframe-template-component.min.js"></script>
<a-scene loading-bar="selector: #camera;">
<!-- <a-scene> -->
<a-assets>
    <audio id="bg-sound" src="https://andrescuervo.github.io/twentyfourseven/assets/sounds/Crackle%20Vinyl%208.wav" preload="auto"></audio>
    <a-mixin id="scale-down" scale="0.009 0.009 0.009"></a-mixin>
    <script id="ply-with-sound" type="text/x-jade-template">
    - var initialScale = "0.01 0.01 0.01"
    - each sound, i in [{src : "https://andrescuervo.github.io/twentyfourseven/assets/sounds/woosh1.wav", dur : 250}, {src : "https://andrescuervo.github.io/twentyfourseven/assets/sounds/woosh2.wav", dur : 1000}, {src : "https://andrescuervo.github.io/twentyfourseven/assets/sounds/woosh3.wav", animTo : "0.1 0 0" }]
        a-entity(scale=initialScale
                position = (-4 + i * 3.5) + " 0 " + "-4" /* + (Math.tan(i) *
                1.5)*/
                material = "side: double; color: #"+ (Math.random(1)*0xFFFFFF<<0).toString(16) + ";"
                sound = "src: url(" + sound.src + "); on: mouseenter; poolSize: 5;"
                shadow = "receive: true"
                animation__whoop = "property: scale; from: " + (sound.animFrom ? sound.animFrom : initialScale) +
                                   "; to: " + (sound.animTo ? sound.animTo : "0.1 0.1 0.1") +
                                   "; dir: alternate; startEvents: mouseenter; dur: " + (sound.dur ? sound.dur : (Math.random(5) + 300)) + ";"
                                   + "easing: easeInOutCirc;"
                ply-model = "src: url(https://andrescuervo.github.io/twentyfourseven/assets/models/woosh" + (i + 1) + ".ply)"
                rotation = "-90 0 0")
    </script>
    <!-- TODO -->
    <!-- TODO -->
    <!-- Could use templates to iterate through this, could use pug :) -->
    <!-- TODO -->
    <!-- TODO -->
</a-assets>
    <a-entity position="-3 0 -5" rotation="0 90 0">
        <a-entity template="src: #ply-with-sound"></a-entity>
        <a-entity cast="true" light="type:point; castShadow: true;" color="blue" position="0 5 0" animation__move = "property: position; from: 0 1.6 -4.5; to: 0 1.6 0; dur: 500; loop: true; dir: alternate;"></></a-entity>
    </a-entity>
    <a-sound src="#bg-sound" autoplay="autoplay" loop="loop"></a-sound>
    <a-entity id="camera" camera="camera" look-controls="look-controls" wasd-controls="wasd-controls">
    <a-entity cursor="fuse: true; fuseTimeout: 500" position="0 0 -1" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: black; shader: flat"></a-entity>
  </a-entity>
  <a-sky color="#DAD"></a-sky>
</a-scene>
<script src="../js/scenes/day11.js"></script>
