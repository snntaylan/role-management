git clone https://github.com/snntaylan/role-management.git
# Role Management System

A frontend application for managing users, roles and permissions built with React, Redux Toolkit, TypeScript and Tailwind CSS.

## Quick Start

### Prerequisites
- Node.js 18+ (or latest LTS)
- npm (or yarn)

### Install

```bash
# clone repository

cd role-management

# install dependencies
npm install
```

### Run (development)

```bash
npm run dev
# open http://localhost:5173 (or the port Vite prints)
```

### Build (production)

```bash
npm run build
npm run preview
```

## Technology & Standards

- React 18 (functional components + hooks)
- Redux Toolkit for app state
- TypeScript with strict-ish typings
- TailwindCSS for styling
- Vite for development & build
- Reselect for memoized selectors
- Formik + Yup for form handling & validation

Code style & conventions
- Use functional components and hooks
- Keep components small and focused
- Prefer composition over inheritance
- Use typed Redux slices and selectors
- Add unit tests for critical logic (recommended)

## Project Structure

Top-level folders and purpose:

```
role-management/
├── public/                 # static assets
├── src/
│   ├── app/                # store + typed hooks
│   ├── components/         # UI components & feature components
│   │   ├── ui/             # buttons, inputs, modals, table, badges
│   │   └── features/       # dashboard, lists, forms
│   ├── features/           # Redux slices & domain logic (users, roles, permissions)
│   ├── pages/              # page-level components (UsersPage, RolesPage, etc.)
│   ├── styles/             # global styles
│   └── main.tsx            # app entry
├── package.json
├── tsconfig.*
├── vite.config.ts
└── README.md
```

## How permissions work (short)
- Permissions are defined centrally and assigned to Roles.
- Users inherit permissions from their assigned Role(s).
- Roles and permissions are editable in the Roles & Permissions pages.

## Troubleshooting
- If dev server fails to start, check the port or run with a different port:

```bash
npm run dev -- --port 5174
```

- If node_modules are corrupted:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Running type checks & linters

```bash
# typecheck
npx tsc --noEmit --project tsconfig.app.json

# lint
npm run lint
```

## Notes for contributors
- When changing state shapes, update selectors and slices together.
- Keep the fake APIs (in `src/features/*/fake*.ts`) consistent with expected types.
- Use the existing hooks in `src/app/hooks.ts` when dispatching or selecting.


## 📝 License
This project is part of a technical interview assessment.

## 👥 Authors

## Acknowledgments

- React community for best practices
- Redux documentation
- TypeScript community
- Tailwind CSS framework
**Project**: Role Management System
**Last Updated**: April 25, 2026
