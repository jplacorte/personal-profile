# Personal Profile Web App 🎒🌸

A beautiful, interactive, and highly customized personal profile application built for **John Phillip**. The app showcases his journey, hobbies, playlists, and a media gallery using a playful, retro-cute aesthetic with custom typography, pixelated offset borders, smooth animations, and responsive layouts.

---

## 🎨 Design & Aesthetics

The application is styled with a custom **"Cute & Cozy" UI design system** using Tailwind CSS:
- **Curated Palette**: Soft pastels (`bg-cute-peach`, `bg-cute-sky`, `bg-cute-lavender`, `bg-cute-mint`) contrasting against a bold, dark outline color (`text-cute-dark` / `#2d2729`).
- **Tactile UI Elements**: Features thick, pixel-offset drop shadows (`shadow-[6px_6px_0px_#2d2729]`) and micro-animations (like spring cursors, hover wobbles, and slide-in page lifts) that make the page feel responsive and alive.
- **Custom Cursor**: A customized, animated cursor trailing style that follows the user's cursor with smooth spring easing.

---

## 🚀 Key Features

### 1. Welcome & Intro Section 🌸
- An outline-card welcome hub featuring profile information and modern, responsive float layouts.
- Dynamic scrolling hooks for responsive page-wide navigation.

### 2. Interactive Journey Timeline 🎒
- A notebook-themed slider that walks visitors through John Phillip's life stages:
  - **Elementary Days**: Features TV shows (*Pokémon*, *Slam Dunk*, *Yu-Gi-Oh!*, *Naruto*, *Dragon Ball Z*), PSP gaming details (*Final Fantasy I*, *Final Fantasy Tactics*, *Star Ocean*, *God of War*, *Dissidia*, *Tekken*, *Naruto: Ultimate Ninja Heroes*), a love for music caught on the **MYX channel**, and playing basketball with cousins.
  - **High School Days**: Details on League of Legends competitive gaming, favorite anime series (*Attack on Titan*, *Sword Art Online*, *Haikyu!!*), serving as an altar server (altar boy) and choir member at the local parish, joining the Senior Scouts for Jamborees, and growing tech curiosities.
  - **College Days**: Documents software development learning, full-stack projects, self-studying, learning to code from talented classmates, budgeting limited allowance, traveling/navigating solo, and commuting 3 hours from home to the city.
- Transition animations powered by **Anime.js** using flat horizontal slide-and-fade actions to simulate turning notebook pages.

### 3. Media Showcase & Playlists 🎵
- **Reset-Free Players**: Embedded YouTube music and karaoke widgets designed to mount persistently. Play and pause triggers are routed dynamically via `postMessage` requests so that tracks do not reset to the beginning when paused.
- **Responsive Photo Gallery Lightbox**: A sleek modal component displaying personal photos. Fully responsive and automatically centered vertically and horizontally on mobile screens, utilizing background scroll-locking for a premium viewer experience.
- **Entertainment Lists**: Showcases favorite TV series (*Modern Family*, *Rick and Morty*, *Family Guy*, *Gravity Falls*, *Phineas and Ferb*) and sports.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React](https://react.dev/) (Hooks, Refs, IntersectionObserver API)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Anime.js](https://animejs.com/) (timeline slides, spring-loaded tactile card wobbles)
- **Icons**: [Lucide Icons](https://lucide.dev/)

---

## ⚙️ Getting Started

First, install dependencies:
```bash
npm install
# or
yarn install
```

To run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build
To verify type-checking and create an optimized production bundle:
```bash
npm run build
```

---

## 📂 Project Structure

```
├── public/                # Static assets & gallery images
└── src/
    ├── app/
    │   ├── globals.css    # Design tokens, custom scrolls, and base font settings
    │   ├── layout.tsx     # Global HTML/Head wrappers
    │   └── page.tsx       # Main page layout and footer container
    └── components/
        ├── CustomCursor.tsx    # Eased trailing spring cursor logic
        ├── IntroSection.tsx    # Welcome header card
        ├── HobbiesSection.tsx  # Hobbies grid and persistent Karaoke player
        ├── MediaSection.tsx    # Playlists, TV shows list, and responsive photo gallery
        └── TimelineSection.tsx # Anime.js notebook-styled slider
```
