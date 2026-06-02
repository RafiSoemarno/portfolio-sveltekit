# Portfolio - SvelteKit

A modern, interactive portfolio website built with [SvelteKit](https://kit.svelte.dev/) and styled with [Tailwind CSS](https://tailwindcss.com/). This project showcases a professional portfolio with smooth animations, 3D graphics, and responsive design.

## 🚀 Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) - A full-stack JavaScript framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **3D Graphics**: [Three.js](https://threejs.org/) - JavaScript 3D library for interactive visuals
- **Database**: [Supabase](https://supabase.com/) - PostgreSQL-based backend
- **Deployment**: [Vercel](https://vercel.com/) - Optimized for Next.js and SvelteKit
- **Language**: TypeScript - For type-safe development
- **Node Version**: >=20.0.0

## 📦 Project Structure

```
src/
├── routes/           # Page routes and layouts
│   ├── +layout.svelte   # Main layout component
│   ├── +page.svelte     # Home page
│   ├── about/           # About page
│   └── work/            # Work/Projects showcase
├── lib/              # Reusable components and utilities
└── app.html          # HTML entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm or pnpm package manager

### Installation

```bash
# Install dependencies
npm install
```

### Development

Start a development server with:

```bash
npm run dev

# or open the app in a new browser tab automatically
npm run dev -- --open
```

Navigate to `http://localhost:5173/` to view the site.

### Building

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Type-check and lint with svelte-check |
| `npm run check:watch` | Watch mode for type-checking |
| `npm run lint` | Run ESLint and Prettier checks |
| `npm run format` | Format code with Prettier |

## 🚢 Deployment

The project is configured for deployment on **Vercel** using the `@sveltejs/adapter-vercel` adapter. The configuration is in `vercel.json`.

To deploy:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Vercel
3. Vercel will automatically build and deploy on every push

For other deployment targets, see [SvelteKit adapters documentation](https://kit.svelte.dev/docs/adapters).

## 🎨 Features

- **Responsive Design**: Mobile-friendly layout using Tailwind CSS
- **Interactive 3D Elements**: Three.js integration for immersive visuals
- **Type Safety**: Full TypeScript support
- **Backend Integration**: Supabase for data persistence
- **Modern Development**: ESLint, Prettier, and Svelte Check for code quality

## 📄 License

This project is private.
