import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// ── TouchTexture ────────────────────────────────────────────────────────────
class TouchTexture {
  size = 64
  maxAge = 64
  radius: number
  trail: { x: number; y: number; age: number; force: number; vx: number; vy: number }[] = []
  last: { x: number; y: number } | null = null
  canvas!: HTMLCanvasElement
  ctx!: CanvasRenderingContext2D
  texture!: THREE.Texture

  constructor() {
    this.radius = 0.25 * this.size
    this.initTexture()
  }

  initTexture() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.canvas.height = this.size
    this.ctx = this.canvas.getContext('2d')!
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.size, this.size)
    this.texture = new THREE.Texture(this.canvas)
  }

  update() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.size, this.size)
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const p = this.trail[i]
      const f = (p.force / this.maxAge) * (1 - p.age / this.maxAge)
      p.x += p.vx * f
      p.y += p.vy * f
      p.age++
      if (p.age > this.maxAge) { this.trail.splice(i, 1); continue }
      this.drawPoint(p)
    }
    this.texture.needsUpdate = true
  }

  addTouch(point: { x: number; y: number }) {
    let force = 0, vx = 0, vy = 0
    if (this.last) {
      const dx = point.x - this.last.x
      const dy = point.y - this.last.y
      if (dx === 0 && dy === 0) return
      const d = Math.sqrt(dx * dx + dy * dy)
      vx = dx / d; vy = dy / d
      force = Math.min((dx * dx + dy * dy) * 20000, 2.0)
    }
    this.last = { x: point.x, y: point.y }
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy })
  }

  drawPoint(p: { x: number; y: number; age: number; force: number; vx: number; vy: number }) {
    const pos = { x: p.x * this.size, y: (1 - p.y) * this.size }
    let intensity = p.age < this.maxAge * 0.3
      ? Math.sin((p.age / (this.maxAge * 0.3)) * (Math.PI / 2))
      : -(1 - (p.age - this.maxAge * 0.3) / (this.maxAge * 0.7)) * ((1 - (p.age - this.maxAge * 0.3) / (this.maxAge * 0.7)) - 2)
    intensity *= p.force
    const color = `${((p.vx + 1) / 2) * 255},${((p.vy + 1) / 2) * 255},${intensity * 255}`
    const offset = this.size * 5
    this.ctx.shadowOffsetX = offset
    this.ctx.shadowOffsetY = offset
    this.ctx.shadowBlur = this.radius
    this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`
    this.ctx.beginPath()
    this.ctx.fillStyle = 'rgba(255,0,0,1)'
    this.ctx.arc(pos.x - offset, pos.y - offset, this.radius, 0, Math.PI * 2)
    this.ctx.fill()
  }
}

// ── Shaders ──────────────────────────────────────────────────────────────────
const vertexShader = `
  varying vec2 vUv;
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform vec3 uColor5;
  uniform vec3 uColor6;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform sampler2D uTouchTexture;
  uniform float uGrainIntensity;
  uniform vec3 uDarkBase;
  uniform float uGradientSize;
  uniform float uColor1Weight;
  uniform float uColor2Weight;
  varying vec2 vUv;

  #define PI 3.14159265359

  float grain(vec2 uv, float t) {
    vec2 g = uv * uResolution * 0.5;
    return fract(sin(dot(g + t, vec2(12.9898, 78.233))) * 43758.5453) * 2.0 - 1.0;
  }

  vec3 getColor(vec2 uv, float t) {
    float r = uGradientSize;
    vec2 c1  = vec2(0.5 + sin(t*uSpeed*0.40)*0.40, 0.5 + cos(t*uSpeed*0.50)*0.40);
    vec2 c2  = vec2(0.5 + cos(t*uSpeed*0.60)*0.50, 0.5 + sin(t*uSpeed*0.45)*0.50);
    vec2 c3  = vec2(0.5 + sin(t*uSpeed*0.35)*0.45, 0.5 + cos(t*uSpeed*0.55)*0.45);
    vec2 c4  = vec2(0.5 + cos(t*uSpeed*0.50)*0.40, 0.5 + sin(t*uSpeed*0.40)*0.40);
    vec2 c5  = vec2(0.5 + sin(t*uSpeed*0.70)*0.35, 0.5 + cos(t*uSpeed*0.60)*0.35);
    vec2 c6  = vec2(0.5 + cos(t*uSpeed*0.45)*0.50, 0.5 + sin(t*uSpeed*0.65)*0.50);
    vec2 c7  = vec2(0.5 + sin(t*uSpeed*0.55)*0.38, 0.5 + cos(t*uSpeed*0.48)*0.42);
    vec2 c8  = vec2(0.5 + cos(t*uSpeed*0.65)*0.36, 0.5 + sin(t*uSpeed*0.52)*0.44);
    vec2 c9  = vec2(0.5 + sin(t*uSpeed*0.42)*0.41, 0.5 + cos(t*uSpeed*0.58)*0.39);
    vec2 c10 = vec2(0.5 + cos(t*uSpeed*0.48)*0.37, 0.5 + sin(t*uSpeed*0.62)*0.43);
    vec2 c11 = vec2(0.5 + sin(t*uSpeed*0.68)*0.33, 0.5 + cos(t*uSpeed*0.44)*0.46);
    vec2 c12 = vec2(0.5 + cos(t*uSpeed*0.38)*0.39, 0.5 + sin(t*uSpeed*0.56)*0.41);

    float i1  = 1.0 - smoothstep(0.0, r, length(uv-c1));
    float i2  = 1.0 - smoothstep(0.0, r, length(uv-c2));
    float i3  = 1.0 - smoothstep(0.0, r, length(uv-c3));
    float i4  = 1.0 - smoothstep(0.0, r, length(uv-c4));
    float i5  = 1.0 - smoothstep(0.0, r, length(uv-c5));
    float i6  = 1.0 - smoothstep(0.0, r, length(uv-c6));
    float i7  = 1.0 - smoothstep(0.0, r, length(uv-c7));
    float i8  = 1.0 - smoothstep(0.0, r, length(uv-c8));
    float i9  = 1.0 - smoothstep(0.0, r, length(uv-c9));
    float i10 = 1.0 - smoothstep(0.0, r, length(uv-c10));
    float i11 = 1.0 - smoothstep(0.0, r, length(uv-c11));
    float i12 = 1.0 - smoothstep(0.0, r, length(uv-c12));

    vec2 rv1 = uv - 0.5;
    float a1 = t*uSpeed*0.15;
    rv1 = vec2(rv1.x*cos(a1)-rv1.y*sin(a1), rv1.x*sin(a1)+rv1.y*cos(a1)) + 0.5;
    vec2 rv2 = uv - 0.5;
    float a2 = -t*uSpeed*0.12;
    rv2 = vec2(rv2.x*cos(a2)-rv2.y*sin(a2), rv2.x*sin(a2)+rv2.y*cos(a2)) + 0.5;

    float ri1 = 1.0 - smoothstep(0.0, 0.8, length(rv1-0.5));
    float ri2 = 1.0 - smoothstep(0.0, 0.8, length(rv2-0.5));

    vec3 col = vec3(0.0);
    col += uColor1 * i1  * (0.55 + 0.45*sin(t*uSpeed))       * uColor1Weight;
    col += uColor2 * i2  * (0.55 + 0.45*cos(t*uSpeed*1.2))   * uColor2Weight;
    col += uColor3 * i3  * (0.55 + 0.45*sin(t*uSpeed*0.8))   * uColor1Weight;
    col += uColor4 * i4  * (0.55 + 0.45*cos(t*uSpeed*1.3))   * uColor2Weight;
    col += uColor5 * i5  * (0.55 + 0.45*sin(t*uSpeed*1.1))   * uColor1Weight;
    col += uColor6 * i6  * (0.55 + 0.45*cos(t*uSpeed*0.9))   * uColor2Weight;
    col += uColor1 * i7  * (0.55 + 0.45*sin(t*uSpeed*1.4))   * uColor1Weight;
    col += uColor2 * i8  * (0.55 + 0.45*cos(t*uSpeed*1.5))   * uColor2Weight;
    col += uColor3 * i9  * (0.55 + 0.45*sin(t*uSpeed*1.6))   * uColor1Weight;
    col += uColor4 * i10 * (0.55 + 0.45*cos(t*uSpeed*1.7))   * uColor2Weight;
    col += uColor5 * i11 * (0.55 + 0.45*sin(t*uSpeed*1.8))   * uColor1Weight;
    col += uColor6 * i12 * (0.55 + 0.45*cos(t*uSpeed*1.9))   * uColor2Weight;

    col += mix(uColor1, uColor3, ri1) * 0.45 * uColor1Weight;
    col += mix(uColor2, uColor4, ri2) * 0.40 * uColor2Weight;

    col = clamp(col, 0.0, 1.0) * uIntensity;
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(lum), col, 1.35);
    col = pow(col, vec3(0.92));

    float br = length(col);
    col = mix(uDarkBase, col, max(br * 1.2, 0.15));
    float mb = length(col);
    if (mb > 1.0) col = col / mb;
    return col;
  }

  void main() {
    vec2 uv = vUv;
    vec4 touch = texture2D(uTouchTexture, uv);
    float vx = -(touch.r * 2.0 - 1.0);
    float vy = -(touch.g * 2.0 - 1.0);
    float intensity = touch.b;
    uv.x += vx * 0.8 * intensity;
    uv.y += vy * 0.8 * intensity;

    float dist = length(uv - 0.5);
    float ripple = sin(dist*20.0 - uTime*3.0) * 0.04 * intensity;
    float wave   = sin(dist*15.0 - uTime*2.0) * 0.03 * intensity;
    uv += vec2(ripple + wave);

    vec3 col = getColor(uv, uTime);
    col += grain(uv, uTime) * uGrainIntensity;

    float ts = uTime * 0.5;
    col.r += sin(ts)        * 0.02;
    col.g += cos(ts * 1.4)  * 0.02;
    col.b += sin(ts * 1.2)  * 0.02;

    float br2 = length(col);
    col = mix(uDarkBase, col, max(br2 * 1.2, 0.15));
    col = clamp(col, 0.0, 1.0);
    float mb2 = length(col);
    if (mb2 > 1.0) col = col / mb2;

    gl_FragColor = vec4(col, 1.0);
  }
`

// ── React component ──────────────────────────────────────────────────────────
export default function LiquidGradient() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    // Scene / Camera
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0e27)
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.z = 50

    const getViewSize = () => {
      const h = Math.abs(camera.position.z * Math.tan((camera.fov * Math.PI) / 180 / 2) * 2)
      return { width: h * camera.aspect, height: h }
    }

    // Touch texture
    const touch = new TouchTexture()

    // Uniforms
    const uniforms = {
      uTime:         { value: 0 },
      uResolution:   { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uColor1:       { value: new THREE.Vector3(0.945, 0.353, 0.133) },
      uColor2:       { value: new THREE.Vector3(0.039, 0.055, 0.153) },
      uColor3:       { value: new THREE.Vector3(0.945, 0.353, 0.133) },
      uColor4:       { value: new THREE.Vector3(0.039, 0.055, 0.153) },
      uColor5:       { value: new THREE.Vector3(0.945, 0.353, 0.133) },
      uColor6:       { value: new THREE.Vector3(0.039, 0.055, 0.153) },
      uSpeed:        { value: 1.5 },
      uIntensity:    { value: 1.8 },
      uTouchTexture: { value: touch.texture },
      uGrainIntensity: { value: 0.08 },
      uDarkBase:     { value: new THREE.Vector3(0.039, 0.055, 0.153) },
      uGradientSize: { value: 0.45 },
      uColor1Weight: { value: 0.5 },
      uColor2Weight: { value: 1.8 },
    }

    // Mesh
    const { width, height } = getViewSize()
    const geo = new THREE.PlaneGeometry(width, height)
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Clock
    const clock = new THREE.Clock()

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      touch.addTouch({ x: e.clientX / window.innerWidth, y: 1 - e.clientY / window.innerHeight })
    }
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      touch.addTouch({ x: t.clientX / window.innerWidth, y: 1 - t.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove)

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
      const vs = getViewSize()
      mesh.geometry.dispose()
      mesh.geometry = new THREE.PlaneGeometry(vs.width, vs.height)
    }
    window.addEventListener('resize', onResize)

    // Animation loop
    let animId: number
    const tick = () => {
      animId = requestAnimationFrame(tick)
      const delta = Math.min(clock.getDelta(), 0.1)
      touch.update()
      uniforms.uTime.value += delta
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 z-0" />
}
