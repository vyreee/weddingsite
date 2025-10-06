# 🎨 Wedding.Site Advanced Animations

## Hero Devices Showcase - Premium 3D Effects

### ✨ Scroll-Linked Animations
- **Container 3D Rotation**: rotateX & rotateY based on scroll progress for dramatic perspective shifts
- **Multi-layer Parallax**: Devices move at different speeds (laptop slower, phone faster) creating depth
- **Dynamic Opacity**: Fades in on scroll approach, fades out when scrolling away
- **Scale Transitions**: Zooms from 80% → 100% → 94% as you scroll through the section
- **Position Transforms**: Vertical movement with sophisticated easing (100px → 0 → -50px)

### 🎯 Magnetic Cursor Attraction
- **Smooth Spring Physics**: Cursor movements use springs (damping: 25, stiffness: 150)
- **Laptop**: Subtle opposite-direction movement for natural feel
- **Phone**: Magnetic pull towards cursor with 3D rotateY/rotateX following mouse
- **Real-time Blur**: Dynamic blur effect based on tilt intensity

### 🌈 Dynamic Glowing Orbs
- **Orb 1** (Powder Blue): Moves from 33% → 60% X, 0% → 80% Y, scales 1 → 1.3 → 0.8
- **Orb 2** (Slate Blue): Moves from 66% → 30% X, 10% → 90% Y, scales 1 → 1.5 → 0.9
- **Orb 3** (Gradient): 180° rotation on scroll with brand gradient (Purple → Blue → Accent)
- **Purpose**: Creates living, breathing atmosphere that responds to user interaction

### 🚀 Entrance Animations
- **Laptop**: Slides in from left with 3D rotateY (-30° → 0°), 1.2s spring animation
- **Phone**: Slides in from right with 3D rotateY (30° → 0°), 1.2s spring, 0.2s delay stagger
- **Container**: Fades in from below (y: 100) with 1s spring, 0.8s delay

### 🎮 Hover Interactions
- **Laptop Hover**:
  - Scale: 1.0 → 1.05
  - rotateY: 0° → 5°
  - rotateZ: 0° → -2°
  - Spring physics: stiffness 300, damping 20

- **Phone Hover**:
  - Scale: 1.0 → 1.08
  - Y-lift: -12px
  - rotateZ: 3°
  - rotateY: -5°
  - Purple shadow glow: `0 30px 60px rgba(83,58,123,0.4)`

### 🎨 Advanced Effects
- **Perspective**: 2000px container, 1500px devices for true 3D depth
- **Transform Style**: `preserve-3d` for nested 3D transforms
- **Blur on Tilt**: Subtle blur (0-0.3px) based on mouse tilt
- **Brightness**: Dynamic brightness adjustment (±10%) on vertical tilt
- **Will-change**: Optimized for 60fps with `will-change-transform`

## Brand Color Integration
All effects use your brand palette:
- **#98C1D9** Powder Blue → accent glows
- **#6969B3** Slate Blue → secondary glows
- **#533A7B** Royal Purple → primary glow, hover shadows
- **#4B244A** Violet → deep accents
- **#25171A** Licorice → text/dark surfaces

## Performance Optimizations
- ✅ Spring animations for natural, physics-based movement
- ✅ `will-change-transform` for GPU acceleration
- ✅ Optimized blur/filter values (< 1px) for performance
- ✅ Debounced mouse movement with springs
- ✅ `useTransform` for efficient scroll-linked values
- ✅ CSS transforms (not layout properties) for 60fps

## Inspiration Sources
- Motion.dev premium examples (card stack, scroll highlight)
- Apple product showcases (magnetic cursor, depth parallax)
- Linear.app (smooth spring physics)
- Vercel (3D perspective on scroll)

## Tech Stack
- **motion** (v12.23+) - Next-gen animation library
- **useScroll** - Scroll-linked value tracking
- **useTransform** - Map scroll progress to animation values
- **useSpring** - Physics-based smooth interpolation
- **useMotionValue** - High-performance reactive values
