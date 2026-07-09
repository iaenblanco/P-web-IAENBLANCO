'use client'

import { useEffect, useRef, useState } from 'react'

const vertexShaderSource = `
  attribute vec3 a_position;
  uniform vec2 u_rotation;
  uniform float u_aspect;
  uniform float u_time;
  uniform float u_point_size;
  varying float v_depth;

  void main() {
    float cy = cos(u_rotation.x);
    float sy = sin(u_rotation.x);
    float cx = cos(u_rotation.y);
    float sx = sin(u_rotation.y);

    vec3 p = a_position;
    p = vec3(
      cy * p.x + sy * p.z,
      p.y,
      -sy * p.x + cy * p.z
    );
    p = vec3(
      p.x,
      cx * p.y - sx * p.z,
      sx * p.y + cx * p.z
    );

    p.y += sin(p.x * 1.7 + u_time * 0.48) * 0.055;
    p.z += cos(p.y * 1.4 - u_time * 0.24) * 0.025;
    float camera = p.z + 5.3;
    gl_Position = vec4((p.x / camera) * 2.7 / u_aspect, (p.y / camera) * 2.7, 0.0, 1.0);
    gl_PointSize = u_point_size * (5.3 / camera) * (1.0 + sin(u_time * 1.1 + a_position.x * 2.2) * 0.08);
    v_depth = clamp(1.0 - (p.z + 2.0) / 4.0, 0.18, 1.0);
  }
`

const fragmentShaderSource = `
  precision mediump float;
  uniform vec3 u_color;
  uniform float u_alpha;
  uniform float u_points;
  varying float v_depth;

  void main() {
    if (u_points > 0.5) {
      vec2 centered = gl_PointCoord - vec2(0.5);
      float distance_to_center = length(centered);
      if (distance_to_center > 0.5) discard;
      float glow = smoothstep(0.5, 0.05, distance_to_center);
      gl_FragColor = vec4(u_color, u_alpha * glow * v_depth);
    } else {
      gl_FragColor = vec4(u_color, u_alpha * v_depth);
    }
  }
`

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  if (!vertex || !fragment) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }
  return program
}

function buildNetwork() {
  const nodes: number[][] = []
  const columns = 8
  const rows = 6

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = (column - (columns - 1) / 2) * 0.58
      const y = (row - (rows - 1) / 2) * 0.52
      const z = Math.sin(column * 0.92 + row * 0.61) * 0.72
        + Math.cos(row * 1.13) * 0.22
      nodes.push([x, y, z])
    }
  }

  const lines: number[] = []
  const connect = (a: number, b: number) => {
    lines.push(...nodes[a], ...nodes[b])
  }

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = row * columns + column
      if (column < columns - 1) connect(index, index + 1)
      if (row < rows - 1) connect(index, index + columns)
      if (row < rows - 1 && column < columns - 1 && (row + column) % 3 === 0) {
        connect(index, index + columns + 1)
      }
    }
  }

  return {
    points: new Float32Array(nodes.flat()),
    lines: new Float32Array(lines),
  }
}

export function OperationalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    if (!gl) return

    const program = createProgram(gl)
    if (!program) return

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const rotationLocation = gl.getUniformLocation(program, 'u_rotation')
    const aspectLocation = gl.getUniformLocation(program, 'u_aspect')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const pointSizeLocation = gl.getUniformLocation(program, 'u_point_size')
    const colorLocation = gl.getUniformLocation(program, 'u_color')
    const alphaLocation = gl.getUniformLocation(program, 'u_alpha')
    const pointsLocation = gl.getUniformLocation(program, 'u_points')

    if (
      positionLocation < 0 ||
      !rotationLocation ||
      !aspectLocation ||
      !timeLocation ||
      !pointSizeLocation ||
      !colorLocation ||
      !alphaLocation ||
      !pointsLocation
    ) {
      gl.deleteProgram(program)
      return
    }

    const { points, lines } = buildNetwork()
    const lineBuffer = gl.createBuffer()
    const pointBuffer = gl.createBuffer()
    if (!lineBuffer || !pointBuffer) {
      gl.deleteProgram(program)
      return
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, lines, gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)

    gl.useProgram(program)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    let width = 0
    let height = 0
    let inView = true
    let targetX = -0.14
    let targetY = 0.16
    let rotationX = targetX
    let rotationY = targetY
    const startedAt = performance.now()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const density = Math.min(window.devicePixelRatio || 1, 1.6)
      width = Math.max(1, Math.round(rect.width * density))
      height = Math.max(1, Math.round(rect.height * density))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      gl.viewport(0, 0, width, height)
    }

    const draw = (now: number) => {
      resize()
      const elapsed = (now - startedAt) / 1000
      const idleX = targetX + Math.sin(elapsed * 0.22) * 0.045
      const idleY = targetY + Math.cos(elapsed * 0.19) * 0.035
      rotationX += (idleX - rotationX) * 0.035
      rotationY += (idleY - rotationY) * 0.035

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.uniform2f(rotationLocation, rotationX, rotationY)
      gl.uniform1f(aspectLocation, width / height)
      gl.uniform1f(timeLocation, elapsed)
      gl.uniform1f(pointSizeLocation, Math.min(window.devicePixelRatio || 1, 1.6) * 6.2)

      gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer)
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)
      gl.uniform3f(colorLocation, 0.08, 0.49, 0.64)
      gl.uniform1f(alphaLocation, 0.48)
      gl.uniform1f(pointsLocation, 0)
      gl.drawArrays(gl.LINES, 0, lines.length / 3)

      gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer)
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)
      gl.uniform3f(colorLocation, 0.1, 0.7, 0.85)
      gl.uniform1f(alphaLocation, 1)
      gl.uniform1f(pointsLocation, 1)
      gl.drawArrays(gl.POINTS, 0, points.length / 3)

      if (!reducedMotion && inView && document.visibilityState === 'visible') {
        frameRef.current = requestAnimationFrame(draw)
      } else {
        frameRef.current = null
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion) return
      const rect = canvas.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      targetX = -0.14 + x * 0.34
      targetY = 0.16 + y * 0.24
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && inView && frameRef.current === null) {
        frameRef.current = requestAnimationFrame(draw)
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView && frameRef.current === null) {
        frameRef.current = requestAnimationFrame(draw)
      }
    })

    resizeObserver.observe(canvas)
    intersectionObserver.observe(canvas)
    canvas.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    resize()
    draw(performance.now())
    setReady(true)

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      gl.deleteBuffer(lineBuffer)
      gl.deleteBuffer(pointBuffer)
      gl.deleteProgram(program)
    }
  }, [])

  return (
    <div className={ready ? 'operational-field is-ready' : 'operational-field'} aria-hidden="true">
      <svg
        className="operational-field__fallback"
        viewBox="0 0 680 580"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g stroke="#1B7E9D" strokeOpacity=".48">
          <path d="M82 126 206 76l128 74 126-58 136 86" />
          <path d="m82 126 34 132 132 34 86-142 100 126 162-98" />
          <path d="m116 258 26 152 144 54 148-188 92 130" />
          <path d="m248 292 38 172 154 28 86-86" />
          <path d="m206 76 42 216M334 150l100 126M460 92l-26 184" />
        </g>
        <g fill="#28A7C8">
          {[
            [82, 126], [206, 76], [334, 150], [460, 92], [596, 178],
            [116, 258], [248, 292], [434, 276], [142, 410], [286, 464],
            [440, 492], [526, 406],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
          ))}
        </g>
      </svg>
      <canvas ref={canvasRef} className="operational-field__canvas" />
    </div>
  )
}
