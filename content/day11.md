---
title: Whoop
display: Whoop
---
<script src="../js/a-frame/0.5.0/aframe.min.js"></script>
<script src="../js/loaders/PLYLoader.js"></script>
<script src="//cdn.rawgit.com/donmccurdy/aframe-extras/v3.8.3/dist/aframe-extras.min.js"></script>
<script src="../js/a-frame/aframe-animation-component.min.my_v1.js"></script>
<a-scene>
<a-assets>
    <audio id="bg-sound" src="https://andrescuervo.github.io/twentyfourseven/assets/sounds/Crackle%20Vinyl%208.wav" preload="auto"></audio>
</a-assets>
  <a-box color="blue"></a-box>
  <a-entity scale="0.5 0.5 0.5" id="woosh1" ply-model="src: url(https://andrescuervo.github.io/twentyfourseven/assets/models/woosh1.ply);"
  position="-2 0 0" material="color: #77c22b;" sound="src: url(https://andrescuervo.github.io/twentyfourseven/assets/sounds/woosh1.wav); on: mouseenter; poolSize: 5;" animation__whoop="property: width; from: 1; to: 3; dir: alternate; startEvents: mouseenter; dur: 250;">
  </a-entity>
  <a-entity position="-0.5 0 2.336111586982353" material="color: #a5ccaa;" sound="src: url(https://andrescuervo.github.io/twentyfourseven/assets/sounds/woosh2.wav); on: mouseenter; poolSize: 5;" animation__whoop="property: width; from: 1; to: 3; dir: alternate; startEvents: mouseenter; dur: 1000;"
  id="woosh2" ply-model="src: url(https://andrescuervo.github.io/twentyfourseven/assets/models/woosh2.ply);"></a-entity>
  <a-entity position="1 0 -3.2775597948922783" material="color: #269afa;" sound="src: url(https://andrescuervo.github.io/twentyfourseven/assets/sounds/woosh3.wav); on: mouseenter; poolSize: 5;" animation__whoop="property: width; from: 1; to: 3; dir: alternate; startEvents: mouseenter; dur: 300.87416262202896;"
  id="woosh3" ply-model="src: url(https://andrescuervo.github.io/twentyfourseven/assets/models/woosh3.ply);"></a-entity>
  <a-sound src="#bg-sound" autoplay="autoplay" loop="loop"></a-sound>
  <a-entity camera="camera" look-controls="look-controls" wasd-controls="wasd-controls">
    <a-entity cursor="fuse: true; fuseTimeout: 500" position="0 0 -1" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: black; shader: flat"></a-entity>
  </a-entity>
  <a-sky color="#DAD"></a-sky>
</a-scene>
<script src="../js/scenes/day11.js"></script>
