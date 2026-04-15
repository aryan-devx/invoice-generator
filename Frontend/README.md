# QuickInvoice - React + Vite

This is a React-based invoice generator app built with Vite.

## Getting Started

Follow these steps to set up the project on your local machine:

### 1. Clone the repository
```bash
git clone <repo-url>
cd invoice-generator-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 4. Additional Setup
- Make sure you have [Node.js](https://nodejs.org/) (v16 or higher) and npm installed.
- If you see missing icons, add this line to `public/index.html` inside the `<head>`:
  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  ```
- For Bootstrap styles, ensure this is also in your `<head>`:
  ```html
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  ```

### 5. Project Structure
- `src/` - Main source code
- `src/pages/` - Page components (LandingPage, MainPage, etc.)
- `src/components/` - Reusable UI components
- `src/assets/` - Images and static assets
- `src/context/` - React context providers

### 6. Common Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

If you have any issues, ask your teammate or check the README for updates!