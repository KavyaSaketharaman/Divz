import { useEffect, useRef } from 'react'

export default function TopoBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dotCount = 15

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    class Dot {
      x: number
      y: number
      radius: number
      angle: number
      speed: number
      range: number
      baseX: number
      baseY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 100 + 120
        this.angle = Math.random() * Math.PI * 2
        this.speed = 0.005 + Math.random() * 0.01
        this.range = 100 + Math.random() * 150
        this.baseX = this.x
        this.baseY = this.y
      }

      update() {
        this.angle += this.speed
        this.x = this.baseX + Math.cos(this.angle) * this.range
        this.y = this.baseY + Math.sin(this.angle) * this.range
      }

      draw() {
        ctx!.fillStyle = 'white'
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    const dots: InstanceType<typeof Dot>[] = []
    for (let i = 0; i < dotCount; i++) {
      dots.push(new Dot())
    }

    let rafId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      dots.forEach((dot) => {
        dot.update()
        dot.draw()
      })
      rafId = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* SVG filter — amber rings for dark mode */}
      <svg
        style={{ position: 'absolute', width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="topo-hollow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="35"
              result="blur"
            />
            <feComponentTransfer in="blur" result="rings">
              <feFuncA
                type="discrete"
                tableValues="0 1 0 1 0 1 0 1 0 1 0 1 0 1 0"
              />
            </feComponentTransfer>
            {/* ↓ Changed from #1A1A1A to warm amber #C9A05A */}
            <feFlood floodColor="#C9A05A" result="amberFill" />
            <feComposite in="amberFill" in2="rings" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Canvas with the filter applied */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          filter: 'url(#topo-hollow)',
        }}
      >
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>
    </>
  )
}