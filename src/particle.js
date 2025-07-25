const words = [
  "React",

  "Javascript",

  "Vue",

  "Vite",

  "Webpack",

  "Rolldown",

  "Rollup",

  "HTML",

  "CSS",

  "Nodejs",

  "Nestjs",

  "Nextjs",
];

export class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;

    this.ctx = canvas?.getContext("2d");

    this.particles = [];

    this.maxParticles = 50;

    // this.maxParticles = 180;

    this.floatSpeed = 1;

    // this.floatSpeed = 5;

    this.spawnRate = 40;

    this.contentType = "all";

    this.fontSize = 5;

    this.particleColor = "#f3f4f6";

    // this.particleColor = "#00c6ff";

    this.perspective = 1000;

    this.maxScale = 1.5;

    // this.maxScale = 5.0;

    this.trailEffect = 30;

    this.smoothFactor = 1; // 平滑因子

    this.lastSpawnTime = 0;

    this.lastFrameTime = performance.now();

    this.frameCount = 0;

    this.fps = 0;

    this.maxSizeMultiplier = 1.0;

    // 初始生成粒子

    for (let i = 0; i < 5; i++) {
      // for (let i = 0; i < 60; i++) {

      setTimeout(() => this.spawnParticle(), i * 30);
    }
  }

  // 添加新粒子

  spawnParticle() {
    if (this.particles.length >= this.maxParticles) return;

    // 确定粒子内容

    let content;

    if (this.contentType === "words") {
      content = words[Math.floor(Math.random() * words.length)];
    } else if (this.contentType === "binary") {
      content = Math.random() > 0.5 ? "0" : "1";
    } else {
      // mixed

      content =
        Math.random() > 0.7
          ? words[Math.floor(Math.random() * words.length)]
          : Math.random() > 0.5
            ? "0"
            : "1";
    }

    // 在屏幕各处随机位置生成粒子

    const x = Math.random() * this.canvas.width;

    const y = Math.random() * this.canvas.height;

    // 创建粒子

    const particle = {
      content,

      x,

      y,

      z: 0,

      startX: x,

      startY: y,

      alpha: 0,

      size: this.fontSize,

      createdAt: performance.now(),

      life: 3000 + Math.random() * 2000, // 3-5秒生命周期

      // 随机浮动偏移

      floatOffset: {
        x: (Math.random() - 0.5) * 1.5,

        y: (Math.random() - 0.5) * 1.5,
      },

      // 目标位置（向观众方向移动）

      targetZ: -(800 + Math.random() * 400), // 负值表示向观众方向移动

      // 平滑位置跟踪

      smoothX: x,

      smoothY: y,

      smoothZ: 0,

      smoothScale: 1,
    };

    this.particles.push(particle);
  }

  // 更新粒子

  update() {
    const currentTime = performance.now();

    const deltaTime = currentTime - this.lastFrameTime;

    // 按需生成新粒子

    if (currentTime - this.lastSpawnTime > this.spawnRate) {
      this.spawnParticle();

      this.lastSpawnTime = currentTime;
    }

    // 重置最大放大倍数

    this.maxSizeMultiplier = 1.0;

    // 更新所有粒子

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // 计算动画进度 (0-1)

      const progress = Math.min(1, (currentTime - p.createdAt) / p.life);

      // 计算目标位置 - 向观众方向移动（z值减小）

      const targetZ = p.targetZ * progress;

      // 添加XY浮动效果

      p.x += (p.floatOffset.x * deltaTime) / 100;

      p.y += (p.floatOffset.y * deltaTime) / 100;

      // 边界检查（使粒子在屏幕内浮动）

      if (p.x < 0) p.floatOffset.x = Math.abs(p.floatOffset.x);

      if (p.x > this.canvas.width) p.floatOffset.x = -Math.abs(p.floatOffset.x);

      if (p.y < 0) p.floatOffset.y = Math.abs(p.floatOffset.y);

      if (p.y > this.canvas.height)
        p.floatOffset.y = -Math.abs(p.floatOffset.y);

      // 使用平滑插值更新位置和缩放

      p.smoothX = this.lerp(p.smoothX, p.x, this.smoothFactor);

      p.smoothY = this.lerp(p.smoothY, p.y, this.smoothFactor);

      p.smoothZ = this.lerp(p.smoothZ, targetZ, this.smoothFactor);

      // 更新透明度

      if (progress < 0.2) {
        p.alpha = progress / 0.2; // 淡入
      } else if (progress > 0.8) {
        p.alpha = 1 - (progress - 0.8) / 0.2; // 淡出
      } else {
        p.alpha = 1; // 中间阶段完全不透明
      }

      // 计算当前放大倍数

      const scale = this.perspective / (this.perspective + p.smoothZ);

      if (scale > this.maxSizeMultiplier) {
        this.maxSizeMultiplier = scale;
      }

      // 移除生命周期结束的粒子

      if (progress >= 1) {
        this.particles.splice(i, 1);
      }
    }

    // 更新FPS计数器

    this.updateFPS(currentTime);

    this.lastFrameTime = currentTime;
  }

  // 线性插值函数 - 核心平滑技术

  lerp(start, end, factor) {
    return start * (1 - factor) + end * factor;
  }

  // 更新FPS计数

  updateFPS(currentTime) {
    this.frameCount++;

    if (currentTime - this.lastFrameTime >= 1000) {
      this.fps = Math.round(
        (this.frameCount * 1000) / (currentTime - this.lastFrameTime),
      );

      this.frameCount = 0;

      // 更新UI

      // document.getElementById("fpsCounter").textContent = this.fps;

      // document.getElementById("particleCount").textContent =

      // this.particles.length;

      // document.getElementById("sizeMultiplier").textContent =

      // this.maxSizeMultiplier.toFixed(1) + "x";

      // // 更新平滑度指示器

      // const smoothPercent = Math.min(100, Math.max(0, this.smoothFactor * 100));

      // document.getElementById("smoothValue").textContent =

      // this.smoothFactor.toFixed(2);

      // document.getElementById("smoothLevel").style.transform =

      // `translateX(${-100 + smoothPercent}%)`;
    }
  }

  // 渲染粒子

  render() {
    // 清除画布（使用半透明黑色实现拖尾效果）

    const trailAlpha = this.trailEffect / 100;

    // this.ctx.fillStyle = `#ffffff`;

    this.ctx.fillStyle = `rgba(255, 255, 255, ${trailAlpha})`;

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 屏幕中心点

    const centerX = this.canvas.width / 2;

    const centerY = this.canvas.height / 2;

    // 按深度排序（从远到近渲染，避免视觉闪烁）

    this.particles.sort((a, b) => a.smoothZ - b.smoothZ);

    // 渲染每个粒子 - 使用平滑后的位置

    for (const p of this.particles) {
      // 计算透视缩放（z值为负，所以scale > 1，实现放大效果）

      const scale = this.perspective / (this.perspective + p.smoothZ);

      const fontSize = p.size * scale;

      // 计算投影位置

      const projectedX = centerX + (p.smoothX - centerX) * scale;

      const projectedY = centerY + (p.smoothY - centerY) * scale;

      // 设置颜色和透明度

      const alpha = Math.min(1, p.alpha);

      this.ctx.fillStyle = `${this.particleColor}${Math.floor(alpha * 255)

        .toString(16)

        .padStart(2, "0")}`;

      // 绘制文本

      this.ctx.save();

      this.ctx.font = `bold ${fontSize}px Consolas, Menlo, Monaco, monospace`;

      this.ctx.textAlign = "center";

      this.ctx.textBaseline = "middle";

      // 开启文本抗锯齿

      this.ctx.shadowBlur = 0.8;

      this.ctx.shadowColor = "rgba(255, 255, 255, 0.2)";

      // 添加发光效果

      if (scale > 2.0) {
        // this.ctx.shadowBlur = 15;
        // this.ctx.shadowColor = this.particleColor;
      }

      this.ctx.fillText(p.content, projectedX, projectedY);

      this.ctx.restore();
    }
  }
}
