# Redesign Website - Futuristic Tech Aesthetic

The goal is to overhaul the existing website's design into a premium, futuristic tech website. The new design will feature buttery smooth animations, translucent/glassmorphic elements, a floating navigation bar, and advanced scroll/hover effects. We will also incorporate a Pakistan-inspired theme (e.g., emerald green, deep green, and white palettes) and add a dark/light mode toggle, all while preserving the existing functionalities.

## User Review Required

> [!IMPORTANT]
> The current project has TailwindCSS v4 installed. The system guidelines generally suggest avoiding TailwindCSS in favor of Vanilla CSS for maximum control and flexibility, unless specifically requested. 
> 
> **Action Needed:** Please let me know if you would like me to remove TailwindCSS and strictly use Vanilla CSS for the new design, or if you prefer me to utilize the existing Tailwind setup alongside custom CSS. I plan to use pure CSS variables and global styles to build the new premium aesthetic.

> [!TIP]
> To achieve "miles ahead" animations, I will leverage the already installed `gsap` (GreenSock Animation Platform) and `@gsap/react` to create buttery smooth scroll triggers and hover effects.

## Open Questions

1. **Pakistan Theme Integration:** Should the Pakistan theme primarily rely on the color palette (Crescent Green, Emerald, White/Silver), or would you also like subtle geometric/cultural patterns incorporated into the backgrounds?
2. **Global Overhaul Scope:** The website has multiple pages (Home, Services, Contact, etc.). Should I apply the global layout (Navbar, Footer, Theme toggle, global styles) and fully redesign the `Home` page first as a proof of concept?

## Proposed Changes

### Global Theme and Configuration

#### [NEW] `src/context/ThemeContext.tsx`
- Create a React context to manage `light` and `dark` modes.
- Provide a toggle function that updates a `data-theme` attribute on the HTML root element.

#### [MODIFY] `src/main.tsx` or `src/App.tsx`
- Wrap the application with the new `ThemeProvider`.

#### [MODIFY] `src/styles.css` & `src/index.css`
- Define robust CSS variables for light and dark modes based on the Pakistan theme (e.g., `--bg-color`, `--text-color`, `--brand-color`).
- Implement futuristic typography and global smooth scrolling (`scroll-behavior: smooth`).
- Add utility classes for glassmorphism and translucency.

---

### Layout Components

#### [MODIFY] `src/components/Navbar.tsx`
- Redesign into a **floating, translucent pill** that sits at the top center of the viewport.
- Apply heavy glassmorphism (blur filters and semi-transparent backgrounds).
- Add the Dark/Light mode toggle button.
- Implement smooth open/close animations for the mobile menu.

#### [MODIFY] `src/components/Footer.tsx` (If exists)
- Update styling to match the new global theme and add subtle hover effects on links.

---

### Home Page Overhaul

#### [MODIFY] `src/pages/Home.tsx`
- **Hero Section:** Overhaul to include a highly engaging, futuristic entrance animation.
- **Scroll Animations:** Use GSAP `ScrollTrigger` to reveal sections (Stats, Team, Testimonials) smoothly as the user scrolls down.
- **Translucent Cards:** Convert stats, team, and testimonial cards to use glassmorphic designs that react seamlessly to hover states.
- **Color Palette:** Ensure all hardcoded colors (like `#000000`) are replaced with CSS variables to support the dark/light mode toggle.

#### [MODIFY] `src/components/HOME/Hero.tsx` & `src/components/HOME/FeaturesReveal.tsx`
- Update inner components of the home page to leverage the new CSS variables and GSAP animations.
- Ensure all elements have micro-interactions (e.g., slight scaling or glowing on hover).

## Verification Plan

### Automated Tests
- Start the Vite development server using `npm run dev`.
- Ensure there are no TypeScript or compilation errors.

### Manual Verification
- **Visual Check:** Navigate through the Home page to ensure the design feels premium, futuristic, and aligns with the Pakistan theme.
- **Animation Check:** Scroll up and down to verify that GSAP animations are buttery smooth and trigger at the correct times.
- **Theme Toggle Check:** Click the dark/light mode toggle in the new Navbar to ensure all colors invert seamlessly without breaking the UI.
- **Responsiveness Check:** Verify the floating Navbar and all sections look stunning on both desktop and mobile viewports.
