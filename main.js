import './style.css'
import * as THREE from 'three'

/**=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
 * DOM
 =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*/
let startButton = document.getElementById("start-button");
let scroll = document.getElementById("scroll");
let hero_container = document.querySelector(".hero-container");

/*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
GSAP ScrollTrigger
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*/

let trigger  = window.innerHeight;
gsap.to("#zoom-in .hero-container",{
     opacity: 0,
     scale: 28,
     stager: 0.25,
     duration: 1,
     scrollTrigger: {
        trigger: "#zoom-in",
        pin: true,
        end: `+=${trigger * 3.5}`,
        scrub: 1
     }
})
/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Cursor
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
        cursor.x = event.clientX / sizes.width - 0.5
        cursor.y = event.clientY / sizes.height - 0.5
})
/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Canvas
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const canvas = document.querySelector('.webgl')
/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Scene
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const scene = new THREE.Scene();

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
       Particles
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const starGeometry = new THREE.BufferGeometry();
const particlesCount = 1400;
const points = [];
let star;
for (let i = 0; i < particlesCount; i++) {
        star = new THREE.Vector3
        (
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
        );
        star.velocity = 0;
        star.acceleration = 0.02;
        points.push(star);
}

const colors = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++){
        colors[i] = Math.random();
}

starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));


let sprite = new THREE.TextureLoader().load('/texture.png');
const particlesMaterial = new THREE.PointsMaterial({
        color: "#fff",
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        map: sprite,
        size: 2.5
})
particlesMaterial.vertexColors = true;

// Points
const particles = new THREE.Points(starGeometry, particlesMaterial)
scene.add(particles)


/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Resizing
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
}
window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight


        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()


        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


})

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Cameras
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/

/**
 * Main camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 1, 1000)
camera.position.z = 1;
camera.rotation.x = Math.PI / 2;
cameraGroup.add(camera)

/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Renderers
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/

const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/*
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=
        Animation Frame
=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= 
*/
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {

        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - previousTime
        previousTime = elapsedTime

        // Animate camera

        const parallaxX = cursor.x * 0.5
        const parallaxY = - cursor.y * 0.5
        cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 1 * deltaTime
        cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 1 * deltaTime
        

        if(scrollY === 0){
                startButton.style.visibility = "visible";
                scroll.style.visibility = "visible";
        }

        if(scrollY > 0){
                startButton.style.visibility = "hidden";
                scroll.style.visibility = "hidden";
        }

        if(scrollY <= 2500){
                hero_container.style.display = "flex";
        }
        if(scrollY > 2500){
                hero_container.style.display = "none";
        }

        points.forEach((e, i)=>{
                e.y -= (1.5) + (scrollY * 0.001);
                if(e.y < -300){
                        e.y = 300;
                        e.velocity = 0;  
                }
        })
        starGeometry.setFromPoints(points);
        starGeometry.attributes.position.needsUpdate = true;

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
}

tick()