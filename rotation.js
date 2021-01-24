var keyboard = new THREEx.KeyboardState();
window.onload = function () {
  // Присвоили значения канвасу
  let width = window.innerWidth;
  let height = window.innerHeight;
  let canvas = document.getElementById("canvas");
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);

  // Рендерер
  let renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setClearColor(0x000000);
  // Сцена
  let scene = new THREE.Scene();
  // Камера
  let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  camera.position.set(0, 0, 1000);
  // Свет
  let light = new THREE.AmbientLight(0xffffff);
  scene.add(light);
  // Настройки меша
  let geometry = new THREE.TorusGeometry(100, 30, 16, 100);
  let material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: THREE.FaceColors,
  });
  for (let i = 0; i < geometry.faces.length; i++) {
    geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
  }
  // Меш
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  mesh = new THREE.Object3D(); // ???
  mesh.rotation.y = Math.PI / 2;
  // mesh.rotation.order = "XYZ";

  // var clock = new THREE.Clock();
  // var elapsedTime = 0;
  // var angleSpeed = THREE.Math.degToRad(10);

  var rotationx = (rotationy = rotationz = 0);

  var _q1 = new THREE.Quaternion(); // CHANGED
  var axisX = new THREE.Vector3(1, 0, 0); // CHANGED
  var axisZ = new THREE.Vector3(0, 0, 1); // CHANGED

  function rotateOnAxis(object, axis, angle) {
    // CHANGED

    _q1.setFromAxisAngle(axis, angle);
    object.quaternion.multiplySelf(_q1);
  }

  window.addEventListener("keydown", function (event) {
    // elapsedTime = clock.getElapsedTime();
    console.log(event.code);
    switch (event.code) {
      case "KeyW":
        rotateOnAxis(mesh, axisX, 0.08); // CHANGED
        // mesh.rotation.x -= 0.5;
        break;
      case "KeyS":
        rotateOnAxis(mesh, axisX, -0.08); // CHANGED
        // mesh.rotation.x += 0.5;
        break;
      case "KeyA":
        rotateOnAxis(mesh, axisZ, 0.08); // CHANGED
        // mesh.rotation.y += Math.sin(elapsedTime) * THREE.Math.degToRad(23);
        break;
      case "KeyD":
        rotateOnAxis(mesh, axisX, -0.08); // CHANGED
        // mesh.rotation.y -= Math.sin(elapsedTime) * THREE.Math.degToRad(23);
        break;
    }
  });
  function loop() {
    renderer.render(scene, camera);
    requestAnimationFrame(function () {
      loop();
    });
  }
  loop();
};
