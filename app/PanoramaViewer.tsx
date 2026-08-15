"use client";

import { useEffect, useRef, useState } from "react";

type PanoramaViewerProps = {
  src: string;
  ariaLabel: string;
};

const VERTEX_SHADER = `
  attribute vec2 aPosition;
  varying vec2 vPosition;

  void main() {
    vPosition = aPosition;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 vPosition;
  uniform sampler2D uPanorama;
  uniform float uAspect;
  uniform float uFov;
  uniform float uYaw;
  uniform float uPitch;

  const float PI = 3.14159265358979323846;

  void main() {
    float scale = tan(uFov * 0.5);
    vec3 direction = normalize(vec3(vPosition.x * uAspect * scale, vPosition.y * scale, -1.0));

    float pitchCos = cos(uPitch);
    float pitchSin = sin(uPitch);
    direction = vec3(
      direction.x,
      direction.y * pitchCos - direction.z * pitchSin,
      direction.y * pitchSin + direction.z * pitchCos
    );

    float yawCos = cos(uYaw);
    float yawSin = sin(uYaw);
    direction = vec3(
      direction.x * yawCos + direction.z * yawSin,
      direction.y,
      -direction.x * yawSin + direction.z * yawCos
    );

    float longitude = atan(direction.x, -direction.z);
    float latitude = asin(clamp(direction.y, -1.0, 1.0));
    vec2 panoramaUv = vec2(fract(0.5 + longitude / (2.0 * PI)), 0.5 - latitude / PI);
    gl_FragColor = texture2D(uPanorama, panoramaUv);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create the panorama shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown panorama shader error.";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

export default function PanoramaViewer({ src, ariaLabel }: PanoramaViewerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<() => void>(() => undefined);
  const viewRef = useRef({ yaw: 0, pitch: -0.04, fov: 72 });
  const pointerRef = useRef<{ id: number; x: number; y: number; yaw: number; pitch: number } | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [hasInteracted, setHasInteracted] = useState(false);

  const redraw = () => drawRef.current();
  const zoom = (amount: number) => {
    viewRef.current.fov = Math.max(35, Math.min(100, viewRef.current.fov + amount));
    setHasInteracted(true);
    redraw();
  };
  const resetView = () => {
    viewRef.current = { yaw: 0, pitch: -0.04, fov: 72 };
    setHasInteracted(false);
    redraw();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) {
      setStatus("error");
      return;
    }

    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let texture: WebGLTexture | null = null;
    let disposed = false;

    try {
      const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      program = gl.createProgram();
      if (!program) throw new Error("Unable to create the panorama program.");
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? "Unable to link the panorama viewer.");
      }

      buffer = gl.createBuffer();
      texture = gl.createTexture();
      if (!buffer || !texture) throw new Error("Unable to prepare the panorama viewer.");

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      gl.useProgram(program);
      const position = gl.getAttribLocation(program, "aPosition");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      const aspectLocation = gl.getUniformLocation(program, "uAspect");
      const fovLocation = gl.getUniformLocation(program, "uFov");
      const yawLocation = gl.getUniformLocation(program, "uYaw");
      const pitchLocation = gl.getUniformLocation(program, "uPitch");
      const panoramaLocation = gl.getUniformLocation(program, "uPanorama");

      const draw = () => {
        if (disposed || !program) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(1, Math.round(rect.width * dpr));
        const height = Math.max(1, Math.round(rect.height * dpr));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
        gl.viewport(0, 0, width, height);
        gl.useProgram(program);
        gl.uniform1f(aspectLocation, width / height);
        gl.uniform1f(fovLocation, viewRef.current.fov * Math.PI / 180);
        gl.uniform1f(yawLocation, viewRef.current.yaw);
        gl.uniform1f(pitchLocation, viewRef.current.pitch);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };
      drawRef.current = draw;

      const image = new Image();
      image.onload = () => {
        if (disposed || !texture) return;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        gl.uniform1i(panoramaLocation, 0);
        setStatus("ready");
        draw();
      };
      image.onerror = () => setStatus("error");
      image.src = src;

      const resizeObserver = new ResizeObserver(draw);
      resizeObserver.observe(canvas);
      return () => {
        disposed = true;
        resizeObserver.disconnect();
        drawRef.current = () => undefined;
        if (texture) gl.deleteTexture(texture);
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
      };
    } catch (error) {
      console.error("Panorama viewer failed to initialize:", error);
      setStatus("error");
    }
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoom(event.deltaY * 0.035);
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  });

  return (
    <div ref={wrapperRef} className={`panorama-viewer panorama-${status}`}>
      <canvas
        ref={canvasRef}
        className="panorama-canvas"
        role="img"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          pointerRef.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            yaw: viewRef.current.yaw,
            pitch: viewRef.current.pitch,
          };
          setHasInteracted(true);
        }}
        onPointerMove={(event) => {
          const start = pointerRef.current;
          if (!start || start.id !== event.pointerId) return;
          viewRef.current.yaw = start.yaw - (event.clientX - start.x) * 0.005;
          viewRef.current.pitch = Math.max(-1.15, Math.min(1.15, start.pitch + (event.clientY - start.y) * 0.004));
          redraw();
        }}
        onPointerUp={(event) => {
          event.currentTarget.releasePointerCapture(event.pointerId);
          pointerRef.current = null;
        }}
        onPointerCancel={() => { pointerRef.current = null; }}
        onKeyDown={(event) => {
          const view = viewRef.current;
          if (event.key === "ArrowLeft") view.yaw += 0.12;
          else if (event.key === "ArrowRight") view.yaw -= 0.12;
          else if (event.key === "ArrowUp") view.pitch = Math.min(1.15, view.pitch + 0.08);
          else if (event.key === "ArrowDown") view.pitch = Math.max(-1.15, view.pitch - 0.08);
          else if (event.key === "+" || event.key === "=") view.fov = Math.max(35, view.fov - 5);
          else if (event.key === "-") view.fov = Math.min(100, view.fov + 5);
          else if (event.key === "Home") resetView();
          else if (event.key.toLowerCase() === "f") wrapperRef.current?.requestFullscreen?.();
          else return;
          event.preventDefault();
          setHasInteracted(true);
          redraw();
        }}
      />

      {status === "loading" && <div className="panorama-status">Loading interactive 360° view…</div>}
      {status === "error" && (
        <div className="panorama-fallback">
          <img src={src} alt={ariaLabel} />
          <p>Your browser could not start the interactive viewer.</p>
        </div>
      )}
      {status === "ready" && !hasInteracted && <div className="panorama-hint">Click + drag to look around · scroll to zoom</div>}

      <div className="panorama-controls" aria-label="Panorama controls">
        <button type="button" onClick={() => zoom(8)} aria-label="Zoom out">−</button>
        <button type="button" className="panorama-reset" onClick={resetView}>Reset view</button>
        <button type="button" onClick={() => zoom(-8)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => wrapperRef.current?.requestFullscreen?.()} aria-label="View panorama full screen">⛶</button>
      </div>
    </div>
  );
}
