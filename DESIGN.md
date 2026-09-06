---
version: alpha
name: Jauhariandev Portofolio
description: Ini adalah sebuah project portofolio yang untuk layanan jasa saya. Project ini akan diakses via web dan akan terdiri dari 5 halaman antara lain:
1. Beranda
2. Tentang Saya
3. Portofolio
4. Layanan
5. Kontak
colors:
  primary: "#2F2342"
  secondary: "#0C3C78"
  tertiary: "#B42B3F"
  neutral: "#F7F7F8"
  surface: "#FFFFFF"
  on-tertiary: "#FFFFFF"
  border: "#E5E4E7"
typography:
  h1:
    fontFamily: Roboto
    fontSize: 3rem
    fontWeight: 700
  body-md:
    fontFamily: Poppins
    fontSize: 1rem
    fontWeight: 400
  label-caps:
    fontFamily: Poppins
    fontSize: 0.75rem
    fontWeight: 600
rounded:
  sm: 4px
  md: 8px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.tertiary}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 20px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
---

# Jauhariandev Portofolio

## Overview

Architectural minimalism meets journalistic gravitas. The UI evokes a premium matte finish — a high-end broadsheet or contemporary gallery.

## Colors

The palette is rooted in semantic tokens. Use the role (e.g. `{colors.primary}`) — never the hex literal — when authoring components.

- **primary (#2F2342)**
- **secondary (#0C3C78)**
- **tertiary (#B42B3F)**
- **neutral (#F7F7F8)**
- **surface (#FFFFFF)**
- **on-tertiary (#FFFFFF)**
- **border (#E5E4E7)**

## Typography

| Token | Font | Size | Weight |
| --- | --- | --- | --- |
| `h1` | Roboto | 3rem | 700 |
| `body-md` | Poppins | 1rem | 400 |
| `label-caps` | Poppins | 0.75rem | 600 |

## Layout

Spacing scale (use the named scale; avoid arbitrary values):

- `spacing.sm` — 8px
- `spacing.md` — 16px
- `spacing.lg` — 24px

## Elevation & Depth

Depth is conveyed through tonal layering and subtle borders rather than drop shadows. Cards lift from the warm neutral background through pure-white surfaces and a single hairline border.

## Shapes

Corner radius scale:

- `rounded.sm` — 4px
- `rounded.md` — 8px

## Components

### button-primary
- backgroundColor: `{colors.tertiary}`
- textColor: `{colors.on-tertiary}`
- rounded: `{rounded.sm}`
- padding: `12px 20px`

### button-secondary
- backgroundColor: `transparent`
- textColor: `{colors.tertiary}`
- rounded: `{rounded.sm}`
- padding: `12px 20px`

### card
- backgroundColor: `{colors.surface}`
- textColor: `{colors.primary}`
- rounded: `{rounded.md}`
- padding: `20px`

### input
- backgroundColor: `{colors.surface}`
- textColor: `{colors.primary}`
- rounded: `{rounded.sm}`
- padding: `10px 14px`

## Do's and Don'ts

- Do use the tertiary color sparingly — only for the highest-emphasis action.
- Don't combine more than two type families on a single screen.
- Don't use full-width images without a generous bottom margin.
- Do default to the warm neutral background; reserve pure white for cards.
