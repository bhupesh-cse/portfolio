import { useEffect, useRef } from "react";

/**
 * IoT / PCB circuit board background.
 * Dramatic but not distracting — deep indigo on near-black.
 */
const IoTBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener("resize", onResize);

    const r = (a, b) => Math.random() * (b - a) + a;
    const ri = (a, b) => Math.floor(r(a, b));

    // Colours
    const INDIGO = "99,102,241";
    const VIOLET = "139,92,246";
    const CYAN   = "34,211,238";

    const COLS = [INDIGO, INDIGO, INDIGO, VIOLET, CYAN];
    const pc   = () => COLS[ri(0, COLS.length)];

    const STEP = 85;
    let nodes = [], traces = [], pulses = [], labels = [];

    const HEX = ["0x1A","GPIO","I²C","SPI","UART","ADC","MQTT","PWM","IRQ","TX","RX","VCC","GND","CLK","0xFF","DMA"];

    const init = () => {
      nodes = [];
      const cols = Math.ceil(W / STEP) + 2;
      const rows = Math.ceil(H / STEP) + 2;
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++)
          nodes.push({
            x: col * STEP + r(-14, 14),
            y: row * STEP + r(-14, 14),
            phase: r(0, Math.PI * 2),
            spd:   r(0.007, 0.018),
            size:  r(1.4, 2.8),
            alpha: r(0.08, 0.22),
            col:   pc(),
          });

      traces = [];
      nodes.forEach((n, i) => {
        const k = ri(1, 3);
        for (let t = 0; t < k; t++) {
          const j = ri(0, nodes.length);
          if (j === i) continue;
          const m = nodes[j];
          if (Math.abs(m.x - n.x) > STEP * 2.8 || Math.abs(m.y - n.y) > STEP * 2.8) continue;
          traces.push({ x1:n.x, y1:n.y, x2:m.x, y2:m.y, col:pc(), alpha:r(0.05,0.13), w:r(0.5,1.1) });
        }
      });

      pulses = Array.from({ length: 24 }, makePulse);
      labels = Array.from({ length: 18 }, () => makeLabel(true));
    };

    const makePulse = () => {
      const t = traces[ri(0, traces.length)];
      return { ...t, p: r(0, 1), spd: r(0.003, 0.01), size: r(2, 3.5) };
    };

    const makeLabel = (init = false) => ({
      x: r(0, W), y: init ? r(0, H) : H + 12,
      vx: r(-0.07, 0.07), vy: r(-0.18, -0.45),
      text: HEX[ri(0, HEX.length)],
      alpha: r(0.08, 0.18),
    });

    init();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Traces
      traces.forEach((t) => {
        ctx.beginPath();
        ctx.moveTo(t.x1, t.y1);
        ctx.lineTo(t.x2, t.y1);
        ctx.lineTo(t.x2, t.y2);
        ctx.strokeStyle = `rgba(${t.col},${t.alpha})`;
        ctx.lineWidth = t.w;
        ctx.stroke();
      });

      // Nodes
      nodes.forEach((n) => {
        n.phase += n.spd;
        const a = n.alpha * (0.5 + 0.5 * Math.sin(n.phase));
        // outer ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.col},${a * 0.25})`;
        ctx.fill();
        // core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.col},${a})`;
        ctx.fill();
      });

      // Pulses
      pulses.forEach((p, i) => {
        p.p += p.spd;
        if (p.p >= 1) { pulses[i] = makePulse(); return; }
        const x = p.x1 + (p.x2 - p.x1) * p.p;
        const y = p.y1 + (p.y2 - p.y1) * p.p;
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.size * 6);
        g.addColorStop(0,   `rgba(${p.col},0.85)`);
        g.addColorStop(0.4, `rgba(${p.col},0.2)`);
        g.addColorStop(1,   `rgba(${p.col},0)`);
        ctx.beginPath(); ctx.arc(x, y, p.size * 6, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},1)`; ctx.fill();
      });

      // Labels
      labels.forEach((l, i) => {
        l.x += l.vx; l.y += l.vy;
        if (l.y < -20) { labels[i] = makeLabel(false); return; }
        ctx.save();
        ctx.globalAlpha = l.alpha;
        ctx.strokeStyle = `rgba(${INDIGO},0.5)`;
        ctx.lineWidth = 0.6;
        ctx.strokeRect(l.x - 19, l.y - 7, 38, 14);
        ctx.fillStyle = `rgba(${INDIGO},0.06)`;
        ctx.fillRect(l.x - 19, l.y - 7, 38, 14);
        ctx.globalAlpha = l.alpha * 2.2;
        ctx.fillStyle = `rgba(${INDIGO},1)`;
        ctx.font = "bold 7.5px 'JetBrains Mono','Courier New',monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(l.text, l.x, l.y);
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default IoTBackground;
