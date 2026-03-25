import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { HotspotInfo, FilterType } from './types';

interface ThreeDGlobeProps {
  hotspots: HotspotInfo[];
  onSelectHotspot: (hotspot: HotspotInfo) => void;
  filter: FilterType;
}

// Convert lat/lng to 3D coordinates on sphere
const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new THREE.Vector3(x, y, z);
};

const ThreeDGlobe: React.FC<ThreeDGlobeProps> = ({ hotspots, onSelectHotspot, filter }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const hotspotMarkersRef = useRef<THREE.Sprite[]>([]);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const isDraggingRef = useRef<boolean>(false);
  const rotationSpeedRef = useRef<number>(0.001);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // State for handling zoom level
  const [zoomLevel, setZoomLevel] = useState<number>(2.5);

  // Setup Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      60, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = zoomLevel;
    cameraRef.current = camera;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Create Earth globe
    const radius = 1;
    const segments = 64;
    const globeGeometry = new THREE.SphereGeometry(radius, segments, segments);
    
    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/earth-texture.jpg', () => {
      if (rendererRef.current) rendererRef.current.render(scene, camera);
    });
    
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpScale: 0.05,
      specular: new THREE.Color(0x333333),
      shininess: 5,
    });
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    globeRef.current = globe;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Auto-rotate when not being dragged
      if (!isDraggingRef.current && globeRef.current) {
        globeRef.current.rotation.y += rotationSpeedRef.current;
      }
      
      if (rendererRef.current && cameraRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);
  
  // Update camera position based on zoom level
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoomLevel;
    }
  }, [zoomLevel]);

  // Add hotspot markers when hotspots change or filter changes
  useEffect(() => {
    if (!sceneRef.current || !globeRef.current) return;
    
    // Remove existing markers
    hotspotMarkersRef.current.forEach(marker => {
      if (sceneRef.current) sceneRef.current.remove(marker);
    });
    hotspotMarkersRef.current = [];
    
    // Filter hotspots
    const filteredHotspots = filter === 'all' 
      ? hotspots 
      : hotspots.filter(h => h.type === filter);
    
    // Create new markers
    filteredHotspots.forEach(hotspot => {
      // Create sprite for hotspot
      const spriteMap = new THREE.TextureLoader().load('/placeholder.svg');
      
      // Choose color based on hotspot type
      let spriteColor: THREE.Color;
      switch(hotspot.type) {
        case 'plastic':
          spriteColor = new THREE.Color(0xef4444); // Red
          break;
        case 'ewaste':
          spriteColor = new THREE.Color(0xf59e0b); // Amber
          break;
        case 'recycling':
          spriteColor = new THREE.Color(0x22c55e); // Green
          break;
        default:
          spriteColor = new THREE.Color(0xffffff); // White
      }
      
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: spriteMap,
        color: spriteColor,
        alphaTest: 0.5,
        opacity: 0.8,
        transparent: true 
      });
      
      const sprite = new THREE.Sprite(spriteMaterial);
      
      // Position sprite on globe surface
      const position = latLngToVector3(hotspot.location.lat, hotspot.location.lng, 1.02);
      sprite.position.copy(position);
      
      // Size based on severity
      let size = 0.05;
      if (hotspot.severity) {
        size = hotspot.severity === 'high' ? 0.12 :
               hotspot.severity === 'medium' ? 0.09 : 0.07;
      }
      sprite.scale.set(size, size, 1);
      
      // Store reference to hotspot data
      (sprite as any).hotspotData = hotspot;
      
      sceneRef.current.add(sprite);
      hotspotMarkersRef.current.push(sprite);
    });
  }, [hotspots, filter]);
  
  // Handle mouse events
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      lastMousePosRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      // Update mouse position for raycasting
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
      
      // Handle drag for rotation
      if (isDraggingRef.current && globeRef.current) {
        const deltaMove = {
          x: event.clientX - lastMousePosRef.current.x,
          y: event.clientY - lastMousePosRef.current.y
        };
        
        globeRef.current.rotation.y += deltaMove.x * 0.005;
        globeRef.current.rotation.x += deltaMove.y * 0.005;
        
        lastMousePosRef.current = {
          x: event.clientX,
          y: event.clientY
        };
      }
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };
    
    const handleClick = () => {
      if (!isDraggingRef.current) {
        // Raycasting for hotspot selection
        if (cameraRef.current && sceneRef.current) {
          raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
          const intersects = raycasterRef.current.intersectObjects(hotspotMarkersRef.current);
          
          if (intersects.length > 0) {
            const hotspot = (intersects[0].object as any).hotspotData;
            onSelectHotspot(hotspot);
          }
        }
      }
    };
    
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      
      // Zoom in/out
      setZoomLevel(prev => {
        const newZoom = prev + event.deltaY * 0.001;
        // Limit zoom range
        return Math.max(1.5, Math.min(5, newZoom));
      });
    };
    
    containerRef.current.addEventListener('mousedown', handleMouseDown);
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseup', handleMouseUp);
    containerRef.current.addEventListener('mouseleave', handleMouseUp);
    containerRef.current.addEventListener('click', handleClick);
    containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      if (!containerRef.current) return;
      
      containerRef.current.removeEventListener('mousedown', handleMouseDown);
      containerRef.current.removeEventListener('mousemove', handleMouseMove);
      containerRef.current.removeEventListener('mouseup', handleMouseUp);
      containerRef.current.removeEventListener('mouseleave', handleMouseUp);
      containerRef.current.removeEventListener('click', handleClick);
      containerRef.current.removeEventListener('wheel', handleWheel);
    };
  }, [onSelectHotspot]);
  
  // Reset globe view
  const resetView = () => {
    if (globeRef.current) {
      globeRef.current.rotation.set(0, 0, 0);
    }
    setZoomLevel(2.5);
  };
  
  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{ overflow: 'hidden' }}
    />
  );
};

export default ThreeDGlobe;
