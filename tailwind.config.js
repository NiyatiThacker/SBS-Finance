/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // ── Color Palette ──────────────────────────────────────
      colors: {
        green: {
          950: "#D3C9BD",    // Warm Grey (navbar, hero, footer backgrounds)
          700: "#453327",    // Rich Walnut (primary headings, titles)
          100: "#F6F4F2",    // Off White (card backgrounds, hover states)
        },
        gold: {
          400: "#B4986B",    // Antique Brass (primary CTA, highlights)
          600: "#AB9E8E",    // Muted Tan (hover states)
        },
        // Text
        ink: {
          dark:  "#453327",  // Rich Walnut (body text)
          muted: "#6B5344",  // Muted Mocha (secondary text)
        },
      },

      // ── Typography ─────────────────────────────────────────
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },

      fontSize: {
        "h1":      ["3rem",    { lineHeight: "1.15", fontWeight: "700" }],
        "h2":      ["2.25rem", { lineHeight: "1.2",  fontWeight: "700" }],
        "h3":      ["1.75rem", { lineHeight: "1.3",  fontWeight: "600" }],
        "h4":      ["1.375rem",{ lineHeight: "1.4",  fontWeight: "600" }],
        "body-lg": ["1.125rem",{ lineHeight: "1.75" }],
        "body":    ["1rem",    { lineHeight: "1.7"  }],
        "caption": ["0.8125rem", { lineHeight: "1.5" }],
      },

      // ── Spacing ────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },

      // ── Border Radius ──────────────────────────────────────
      borderRadius: {
        "card": "1rem",     // 16px — product/service cards
      },

      // ── Box Shadows ────────────────────────────────────────
      boxShadow: {
        "card":       "0 4px 20px rgba(69, 51, 39, 0.06)",
        "card-hover": "0 10px 40px rgba(69, 51, 39, 0.12)",
        "navbar":     "0 2px 12px rgba(69, 51, 39, 0.08)",
      },

      // ── Transitions & Animations ───────────────────────────
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
      },
      animation: {
        pulse: 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
