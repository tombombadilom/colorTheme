import React, { useEffect, useRef } from 'react';
import vertexShader from './shader/plasma.vert';
import fragmentShader from './shader/plasma.frag';

const Plasma: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const startTimeRef = useRef(Date.now());
  const canvas = canvasRef.current;
  const gl = canvas?.getContext('webgl');

  useEffect(() => {
    if (!canvas) {
      return console.error('Canvas is null');
    }
      
    if (!gl) {
      return console.error('WebGL not supported');
    }
    const setupProgram = () => {
    const program = gl.createProgram();
    if (program) {
      const vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
      const fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);

      if (vertexShaderObject && fragmentShaderObject) {
        gl.shaderSource(vertexShaderObject, vertexShader);
        gl.compileShader(vertexShaderObject);
        gl.attachShader(program, vertexShaderObject);

        gl.shaderSource(fragmentShaderObject, fragmentShader);
        gl.compileShader(fragmentShaderObject);
        gl.attachShader(program, fragmentShaderObject);

        gl.linkProgram(program);

        // Check if the program was linked successfully
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error('Could not initialize the shader program: ', gl.getProgramInfoLog(program));
          return null; // Stop the setup if the program wasn't linked successfully
        }

        gl.useProgram(program);
      }
      }
      return program;
    };
    const program = setupProgram();
    if (!program) {
      return; // Exit the effect early if the program setup was not successful
    }
     
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2fv(glVars.uRes, [width, height]);
    };

    const glVars = {
      aVertexPosition: gl.getAttribLocation(program, "aVertexPosition"),
      uTime: gl.getUniformLocation(program, "uTime"),
      uRes: gl.getUniformLocation(program, "uRes")
    };

    const drawScene = () => {
      requestAnimationFrame(drawScene);
      const time = Date.now() - startTimeRef.current;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(glVars.uTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const resizeHandler = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', resizeHandler);

    setupProgram();
    resizeCanvas();
    drawScene();

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };    
  }, [canvasRef, startTimeRef, gl, canvas]);

  return (
    <canvas 
      ref={canvasRef}
    />
  );
};

export default Plasma;