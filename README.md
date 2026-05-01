git clone https://github.com/snntaylan/role-management.git
# Role Management System

<<<<<<< HEAD
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
=======
A comprehensive React application for managing user roles, permissions, and access control. Built with modern React patterns, Redux Toolkit for state management, and Tailwind CSS for styling.

## 🚀 Features

### Core Functionality
- **Role Management**: Create, read, update, and delete roles with permission assignments
- **Permission System**: Define and manage system permissions with categories
- **User Management**: User CRUD operations with role assignments
- **Dashboard**: Overview and quick navigation to main features
- **Access Control**: Permission-based feature access and UI rendering

### Technical Features
- **State Management**: Redux Toolkit with normalized state structure
- **Data Persistence**: Local storage integration for data persistence
- **Form Validation**: Formik + Yup for robust form handling
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript coverage with strict typing
- **Component Library**: Reusable UI components (Button, Modal, Table, etc.)

## 🛠️ Tech Stack

- **Frontend**: React 19.2.5 with TypeScript
- **State Management**: Redux Toolkit 2.11.2
- **Routing**: React Router DOM 7.14.2
- **Styling**: Tailwind CSS 4.2.4
- **Forms**: Formik 2.4.1 + Yup 1.2.0
- **UI Components**: Headless UI 2.2.10
- **Build Tool**: Vite 8.0.10
- **Testing**: Vitest + React Testing Library + jsdom
- **Development**: ESLint, TypeScript compiler

## 📁 Project Structure

```
role-management/
├── src/
│   ├── app/                          # Redux store & hooks
│   │   ├── store.ts                 # Store configuration
│   │   └── hooks.ts                 # Typed Redux hooks
│   │
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Alert.tsx
│   │   │   └── MultiSelect.tsx
│   │   │
│   │   ├── layout/                  # Layout components
│   │   │   ├── Layout.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   └── features/                # Feature-specific components
│   │       ├── Dashboard.tsx
│   │       ├── RolesList.tsx
│   │       ├── RolesList.test.tsx   # Component tests
│   │       └── PermissionsList.tsx
│   │
│   ├── features/                    # Feature modules (Redux slices)
│   │   ├── roles/                   # Roles management
│   │   │   ├── rolesSlice.ts       # Redux slice
│   │   │   ├── rolesApi.ts         # API service
│   │   │   ├── fakeRolesApi.ts     # Fake API implementation
│   │   │   ├── rolesSelectors.ts   # Memoized selectors
│   │   │   ├── rolesHooks.ts       # Custom hooks
│   │   │   └── rolesTypes.ts       # TypeScript types
│   │   │
│   │   ├── permissions/             # Permissions management
│   │   ├── users/                   # Users management
│   │   ├── userRoleAssignments/     # User-role assignments
│   │   └── accessControl/           # Access control logic
│   │
│   ├── pages/                       # Page components
│   │   ├── RolesPage.tsx
│   │   ├── UsersPage.tsx
│   │   └── PermissionsPage.tsx
│   │
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # App entry point
│   ├── index.css                    # Global styles
│   ├── App.css                      # App-specific styles
│   └── test/                        # Test configuration
│       └── setup.ts                 # Test setup and global configuration
│
├── public/                          # Static assets
├── package.json                     # Dependencies & scripts
├── vite.config.ts                   # Vite configuration
├── vitest.config.ts                 # Vitest configuration
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.js               # Tailwind configuration
└── eslint.config.js                 # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/snntaylan/role-management.git
   cd role-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
>>>>>>> c743afa48adc3ecbf38e128872de419f7e574158

```bash
npm run build
npm run preview
```

<<<<<<< HEAD
## Technology & Standards

- React 18 (functional components + hooks)
- Redux Toolkit for app state
- TypeScript with strict-ish typings
- TailwindCSS for styling
- Vite for development & build
- Reselect for memoized selectors
- Formik + Yup for form handling & validation
=======
## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npx vitest run       # Run tests once
npx vitest           # Run tests in watch mode
npx vitest --ui      # Run tests with UI
```

## 🧪 Testing

The project includes comprehensive tests using **React Testing Library** and **Vitest**:

- **9 test cases** covering RolesList component functionality
- **Unit tests** for component rendering, user interactions, and state management
- **Mock implementations** for UI components and external dependencies
- **Test coverage** for loading states, error handling, and form validation

### Test Features
- Component rendering with different props
- User interaction testing (clicks, form submissions)
- Async operation testing
- Error boundary and validation testing
- Accessibility testing with proper ARIA roles
>>>>>>> c743afa48adc3ecbf38e128872de419f7e574158

Code style & conventions
- Use functional components and hooks
- Keep components small and focused
- Prefer composition over inheritance
- Use typed Redux slices and selectors
- Add unit tests for critical logic (recommended)

<<<<<<< HEAD
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
=======
### State Management
- **Redux Toolkit**: Modern Redux with slices, async thunks, and devtools
- **Normalized State**: Efficient data structure for entities
- **Local Storage**: Data persistence across browser sessions
- **Typed Selectors**: Memoized selectors with TypeScript support

### Component Architecture
- **Feature-Based**: Components organized by business features
- **Reusable UI**: Generic components for consistent design
- **Layout Components**: Header, sidebar, and main layout wrapper
- **Page Components**: Route-level components with business logic

### API Layer
- **Service Abstraction**: Clean API interface with fake backend
- **Local Storage**: Simulated backend with data persistence
- **Error Handling**: Comprehensive error management
- **Type Safety**: Fully typed API responses and requests

## 🎨 UI Components

### Core Components
- **Button**: Multiple variants (primary, secondary, danger) and sizes
- **Input**: Text inputs with validation states and error handling
- **Modal**: Customizable modal dialogs with backdrop
- **Table**: Sortable, paginated tables with selection support
- **Select**: Single and multi-select dropdowns
- **Badge**: Status indicators with color coding
- **Alert**: Notification messages with different types

### Layout System
- **Header**: Navigation bar with branding
- **Sidebar**: Collapsible navigation menu
- **Layout**: Main application wrapper with responsive design

## 🔧 Key Features Implementation

### Role Management
- CRUD operations for roles
- Permission assignment to roles
- Role status management (Active/Inactive)
- Search and filtering capabilities

### Permission System
- Hierarchical permission structure
- Category-based organization
- Permission assignment workflows

### User Management
- User CRUD with profile management
- Role assignment to users
- User status and department tracking
- Advanced filtering and search

### Access Control
- Permission-based UI rendering
- Route protection mechanisms
- Feature access control

## 🧪 Development

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Code formatting (via ESLint)

### State Management Patterns
- **Slices**: Feature-based Redux slices
- **Selectors**: Memoized selectors for performance
- **Async Thunks**: API call management
- **Normalized Data**: Efficient state structure

### Component Patterns
- **Functional Components**: Modern React with hooks
- **Custom Hooks**: Reusable logic extraction
- **TypeScript Props**: Fully typed component interfaces
- **Error Boundaries**: Graceful error handling

## 📊 Data Flow

1. **User Interaction** → Component event handlers
2. **Dispatch Actions** → Redux async thunks
3. **API Calls** → Fake API service layer
4. **State Updates** → Redux reducers
5. **UI Re-render** → React components with selectors

## 🔄 State Persistence

- **Local Storage**: Automatic data persistence
- **Seed Data**: Initial data population on first load
- **Migration Support**: Versioned storage keys
- **Error Recovery**: Graceful handling of storage issues

## 🎯 Pages & Navigation

- **Dashboard** (`/`): Overview and quick actions
- **Roles** (`/roles`): Role management interface
- **Users** (`/users`): User management interface
- **Permissions** (`/permissions`): Permission management interface

## 🚀 Deployment

### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Checklist
- [ ] Run `npm run lint` for code quality
- [ ] Run `npm run build` successfully
- [ ] Test the production build with `npm run preview`
- [ ] Verify all features work in production
- [ ] Check browser console for errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Write comprehensive tests for new features
- Maintain consistent code style
- Update documentation for API changes

## 📝 License

This project is for demonstration purposes.
>>>>>>> c743afa48adc3ecbf38e128872de419f7e574158


<<<<<<< HEAD
## Acknowledgments

- React community for best practices
- Redux documentation
- TypeScript community
- Tailwind CSS framework
**Project**: Role Management System
**Last Updated**: April 25, 2026
=======
>>>>>>> c743afa48adc3ecbf38e128872de419f7e574158
