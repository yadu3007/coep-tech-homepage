# Design Brief: COEP Technological University — Premium Institutional

## Tone & Differentiation
Prestigious institutional design (MIT, INSEAD, London Business School aesthetic). Deep blue authority, cobalt energy, gold restraint. Sophisticated typography hierarchy, generous whitespace, cinematic scroll animations. Confidence without arrogance.

## Color Palette (OKLCH)
| Name | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| COEP Cobalt | `0.50 0.21 265` | `#1648C8` | Navigation, CTA sections, card accents |
| Deep Blue | `0.30 0.15 264` | `#0F3499` | **ALL headings** (h1–h4) |
| Midnight | `0.15 0.08 264` | `#081E5C` | Footer background |
| Bright Gold | `0.75 0.22 82` | `#E8C42A` | Primary buttons, active nav ONLY |
| White | `0.99 0 0` | `#ffffff` | Body backgrounds, text on dark |
| Foreground | `0.99 0 0` | `#ffffff` | Text on dark sections |

## Typography
| Tier | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Fraunces (serif) | 700 | All h1–h4, hero text, stat labels |
| Body | General Sans | 400–600 | Body copy, UI labels, buttons, navigation |
| Mono | JetBrains Mono | 400 | Code, technical content |

## Structural Zones
| Zone | Background | Text | Accent | Role |
|------|-----------|------|--------|------|
| Header/Nav | `cobalt` | white | gold (active) | Primary navigation, sticky |
| Hero Video | white | – | – | Cinematic campus video, full-bleed |
| Content Sections | white | deep-blue (h*), body | cobalt accents | Main content, generous padding |
| CTA Sections | `cobalt` | white | gold buttons | Call-to-action backgrounds |
| Stats Row | deep-blue | white | gold numbers | Animated counter metrics |
| Footer | midnight | white | gold links | Address, links, social |

## Spacing & Rhythm
- Section padding: 5rem (lg), 3rem (md), 2rem (sm).
- Card gap: 2rem.
- Stat grid: 2-col (sm), 3-col (md), 4-col (lg).
- Type scale: 72px (h1), 56px (h2), 40px (h3), 28px (h4), 16px (body).

## Component Patterns
| Component | Style | Interaction |
|-----------|-------|-------------|
| Nav Button | font-display, text-white | gold underline on active, scale-105 hover |
| Primary Button | bg-gold, text-deepblue, rounded-md | shadow-elevated, scale-105 |
| Card Elevated | bg-white, border-border, shadow-md | shadow-lg, translate-y-[-2px] on hover |
| Heading | font-display, text-deepblue, serif | default, letter-spacing: -0.02em |
| Stat Counter | font-display, text-gold, 72px | animate from 0 on scroll |

## Motion & Animations
- **Scroll reveal**: Images fade-in + scale(0.95→1.0) as they enter viewport (0.65s ease-out).
- **Hover**: Cards lift (translate-y-[-2px]), buttons scale 105%, 0.3s cubic-bezier.
- **Parallax**: Hero section video background moves at 0.5x scroll speed.
- **Counter**: Stats count from 0 to value on scroll, 1.5s per counter.
- **Dropdown**: Fade-in + slide-down 180ms ease-out.

## Constraints
- **Color**: Strict 4-color system—no variants unless semantic. Gold used ONLY on primary buttons + active nav.
- **Typography**: Fraunces (display) + General Sans (body) ONLY. No system fonts, no serif body.
- **Spacing**: 5/3/2rem padding, 2rem gaps. Generous whitespace = institutional prestige.
- **Shadows**: shadow-md (default), shadow-elevated (hover). No glows, gradients, or neon.
- **Border-radius**: Minimal (8px max on cards). Nav/hero/footer sharp edges.

## Signature Details
1. **Serif headings** (Fraunces) signal prestige and editorial authority.
2. **Gold restraint** — appears only on active states + primary CTAs, creating impact.
3. **Deep blue headings** command visual hierarchy; cobalt nav energizes without chaos.
4. **Cinematic hero** — video full-bleed, parallax scroll, no text overlay.
5. **Generous breathing room** — 5rem section padding conveys confidence and institutional scale.

## Accessibility
- Contrast: White on cobalt ≥4.5:1 (verified). Gold on deep blue ≥4.5:1 (verified).
- Font: Base 17px (106.25% html scale), type hierarchy via size + weight + serif.
- Focus: ring-gold 2px on all interactive elements.
- Motion: Respect prefers-reduced-motion; disable scroll reveals + parallax if requested.
