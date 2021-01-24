var renderer, scene, camera;

var goLeft = false
var goRight = false
var goUp = false
var goDown = false

//vars
var rotationx = rotationy = rotationz = 0
    
var _q1 = new THREE.Quaternion(); // CHANGED
var axisX = new THREE.Vector3( 1, 0, 0 ); // CHANGED
var axisZ = new THREE.Vector3( 0, 0, 1 ); // CHANGED

function rotateOnAxis( object, axis, angle ) { // CHANGED
    
    _q1.setFromAxisAngle( axis, angle );
    object.quaternion.multiplySelf( _q1 );

}    

init();
animate();

function init() {
    airplane = new THREE.Object3D();
    
    airplane.useQuaternion = true; // CHANGED
    
    // dom
    var container = document.getElementById( 'container' );

    // renderer
    renderer = new THREE.WebGLRenderer( { clearColor: 0x000000, clearAlpha: 1 } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    
    // scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 400;


    var axes = new THREE.AxisHelper();
    
    airplane.add( axes );  // CHANGED
    

    //using a cube to represent my airplane for jsfiddle purposes
    //in my code i'm loading in a collada model   
    var cubeMaterial = new THREE.MeshPhongMaterial( { ambient: 0xffabe4, color: 0xace3ff, specular: 0xffabe4, shininess: 0, perPixel: true, metal: true } );
    var cube = new THREE.Mesh( new THREE.CubeGeometry( 50, 50, 50 ), new THREE.MeshNormalMaterial() );
    airplane.add(cube)        

    scene.add(airplane)

}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {
    if(goLeft)
        rotateOnAxis( airplane, axisZ, 0.08 ); // CHANGED
        
    if(goRight)
        rotateOnAxis( airplane, axisZ, - 0.08 ); // CHANGED

    if(goUp)
        rotateOnAxis( airplane, axisX, 0.08 ); // CHANGED

    if(goDown)
        rotateOnAxis( airplane, axisX, - 0.08 ); // CHANGED
                    
    renderer.render( scene, camera );

}


//arrow keys pressed
$(document).keydown(function(e){
    if (e.keyCode == 37) {  //left arrow
        goLeft = true
        goRight = false
    }
    if (e.keyCode == 39) { //right arrow
        goRight = true
        goLeft = false
    }
    if (e.keyCode == 38) {  //up arrow
        goDown = true
        goUp = false
    }
    if (e.keyCode == 40) { //down arrow
        goUp = true
        goDown = false
    }
});

$(document).keyup(function(){
    goLeft = false
    goRight = false
    goUp = false
    goDown = false
});
