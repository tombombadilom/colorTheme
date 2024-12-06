import * as THREE from 'three';
import type React from 'react';
import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

import { useMarble } from '@funtech-inc/use-shader-fx';

interface BackgroundProps {
  speed?: number; // La valeur par défaut sera définie plus bas.
  isDarkMode?: boolean; // La valeur par défaut sera définie plus bas.
}

const Mesh: React.FC<BackgroundProps> = ({
  speed = 0.5, // Valeur par défaut pour la vitesse si non spécifiée
  isDarkMode = false, // Valeur par défaut pour isDarkMode si non spécifiée
}) => {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
 
  const [updateMarble, , { output }] = useMarble({ size, dpr: viewport.dpr });

  // Couleurs pour les thèmes light et dark.
  const lightModeBaseColor = new THREE.Color(0xFFFFFF); // Blanc
  const darkModeBaseColor = new THREE.Color(0x000000); // Noir
  const lightModeAccentColor = new THREE.Color(0xCCCCCC); // Gris clair
  const darkModeAccentColor = new THREE.Color(0x222222); // Gris foncé

  useFrame((state, delta) => {
    updateMarble(state);
    
    // Transition douce entre les couleurs en fonction du mode.
    if (ref.current) {
      ref.current.uniforms.u_baseColor.value.lerp(
        isDarkMode ? darkModeBaseColor : lightModeBaseColor,
        delta * speed // Utiliser une valeur différente si nécessaire pour ajuster la vitesse de transition
      );
      
      ref.current.uniforms.u_accentColor.value.lerp(
        isDarkMode ? darkModeAccentColor : lightModeAccentColor,
        delta * speed // Utiliser une valeur différente si nécessaire pour ajuster la vitesse de transition
      );
    }
  });

  return (
   
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;
          varying vec2 vUv;
          uniform sampler2D u_fx;
          uniform vec3 u_baseColor;
          uniform vec3 u_accentColor;

          void main() {
            vec2 uv = vUv;
            vec4 texColor = texture2D(u_fx, uv);

            // Mélange de la texture avec les couleurs de base et d'accentuation.
            gl_FragColor = mix(vec4(u_baseColor, 1.0), texColor, texColor.a);
            gl_FragColor.rgb += u_accentColor * texColor.rgb; // exemple simple d'utilisation de la couleur d'accent
          }
        `}
        uniforms={{
          u_fx: { value: output },
          u_baseColor: { value: lightModeBaseColor }, // Initialisé avec la couleur de base pour le mode clair
          u_accentColor: { value: lightModeAccentColor }, // Initialisé avec la couleur d'accent pour le mode clair
        }}
      />
    </mesh>
    
  );
};

export const Background: React.FC<BackgroundProps> = ({ speed, isDarkMode }) => {
  return (
    <Canvas
      style={{
        width: '100vw',
        height: '100dvh', // Corrected 'dvh' to 'vh'
        margin: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <Mesh speed={speed} isDarkMode={isDarkMode} />
    </Canvas>
  );
};