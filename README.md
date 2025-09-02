# Profile Management Application

A modern React application for managing user profiles with Redux Toolkit state management, form validation, and beautiful UI design.

## Features

✨ **Core Features:**
- Create, view, edit, and delete user profiles
- Form validation with React Hook Form and Zod
- Redux Toolkit for global state management
- Local storage persistence
- Beautiful responsive design with Tailwind CSS
- Toast notifications for user feedback
- Error handling with graceful fallbacks

🎨 **Design System:**
- Beautiful gradient-based design
- Premium UI components with shadcn/ui
- Smooth animations and hover effects
- Glass morphism effects
- Dark/light mode support
- Professional typography

## Technology Stack

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Vite** for fast development

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd profile-management-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   Create `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   VITE_NODE_ENV=development
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## Environment Variables

The application supports environment-based configuration:

- **Development:** Uses `.env` file
- **Production:** Uses `.env.production` file

### Available Variables:
- `VITE_API_BASE_URL`: Base URL for API endpoints
- `VITE_NODE_ENV`: Environment mode (development/production)

## Application Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── Navigation.tsx      # Navigation bar
│   ├── ProfileForm.tsx     # Profile form component
│   └── ProfileDisplay.tsx  # Profile display component
├── pages/
│   ├── HomePage.tsx        # Landing page
│   ├── ProfileFormPage.tsx # Form page
│   ├── ProfilePage.tsx     # Profile view page
│   └── NotFound.tsx        # 404 page
├── store/
│   ├── store.ts           # Redux store configuration
│   ├── hooks.ts           # Typed Redux hooks
│   └── slices/
│       └── profileSlice.ts # Profile state management
└── utils/
    └── api.ts             # API configuration
```

## Key Features Explained

### 🔧 State Management
- **Redux Toolkit** for predictable state management
- **Async thunks** for API operations
- **Local storage** synchronization
- **Error handling** with user-friendly messages

### 📝 Form Validation
- **React Hook Form** for performance
- **Zod schema validation** for type safety
- **Real-time validation** feedback
- **Accessible form controls**

### 🎨 Design System
- **Custom design tokens** in `index.css`
- **Component variants** for consistency
- **Gradient backgrounds** and effects
- **Responsive breakpoints**

### 🛣️ Routing
- **React Router** for navigation
- **Protected routes** logic
- **404 error handling**
- **URL parameter support** for edit mode

### 💾 Data Persistence
- **Local storage** for offline access
- **API simulation** with realistic delays
- **Optimistic updates** for better UX
- **Error recovery** mechanisms

## API Integration

The application includes a mock API system that simulates real backend behavior:

- **Success rates:** 90-95% to simulate real-world conditions
- **Loading states:** Realistic delays for better UX testing
- **Error handling:** Proper error messages and recovery
- **Local storage backup:** Ensures data persistence

## Deployment

### Deploy to Vercel:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   ```bash
   npx vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard:
   - `VITE_API_BASE_URL`
   - `VITE_NODE_ENV`

### Production Considerations:
- Update API endpoints in `.env.production`
- Configure proper CORS settings
- Set up monitoring and analytics
- Implement proper error reporting

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Design Decisions

### Why Redux Toolkit?
- **Predictable state management** across the application
- **DevTools integration** for debugging
- **Middleware support** for async operations
- **Type safety** with TypeScript

### Why React Hook Form + Zod?
- **Performance optimization** with minimal re-renders
- **Type-safe validation** schemas
- **Great developer experience**
- **Accessibility support** out of the box

### Why Tailwind CSS?
- **Utility-first approach** for rapid development
- **Consistent design system** with custom tokens
- **Responsive design** made easy
- **Small bundle size** with purging

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

Built with ❤️ using React, TypeScript, and modern web technologies.