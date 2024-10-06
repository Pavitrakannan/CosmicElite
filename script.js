// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("orrery").appendChild(renderer.domElement);

// Set up OrbitControls for camera movement
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create Sun
const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Create Earth
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = 8; // Position the Earth a bit away from the Sun
scene.add(earth);

// Add other planets similarly
const marsGeometry = new THREE.SphereGeometry(0.7, 32, 32);
const marsMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.x = 12; // Position Mars farther away from the Sun
scene.add(mars);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Earth orbit
    const time = Date.now() * 0.0005; // Adjust time scale
    earth.position.x = 8 * Math.cos(time);
    earth.position.z = 8 * Math.sin(time);

    // Mars orbit
    mars.position.x = 12 * Math.cos(time * 0.8); // Mars orbits slower
    mars.position.z = 12 * Math.sin(time * 0.8);

    controls.update(); // Update controls for camera
    renderer.render(scene, camera);
}

// Resize handler
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Set initial camera position
camera.position.z = 20;

animate();
