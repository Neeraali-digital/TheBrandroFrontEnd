# The Brandro - Landing Page

A modern, responsive landing page for The Brandro, the world's #1 PR brand. Built with Angular 20 (latest stable version) using modern web development practices.

## 🚀 Features

- **Modern Design**: Clean, professional design with light color theme
- **Light Color Palette**: Soft gradients with light blue, purple, green, pink, and yellow accents
- **Responsive Layout**: Optimized for all device sizes
- **Component-Based Architecture**: Modular and maintainable code structure
- **Animated Client Carousel**: Automatically scrolling client showcase with hover pause
- **Future-Ready Routing**: Scalable routing configuration for expansion
- **Accessibility**: WCAG compliant with proper focus management
- **Performance Optimized**: Lazy loading and modern Angular features
- **Glass Morphism Effects**: Modern backdrop blur and transparency effects

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── header/         # Navigation header
│   │   ├── hero/           # Hero section with stats
│   │   ├── services/       # Services showcase
│   │   └── footer/         # Footer with contact info
│   ├── pages/              # Page components
│   │   └── landing/        # Main landing page
│   ├── shared/             # Shared utilities (for future scaling)
│   │   ├── services/       # Business logic services
│   │   ├── models/         # TypeScript interfaces/models
│   │   ├── guards/         # Route guards
│   │   ├── interceptors/   # HTTP interceptors
│   │   ├── pipes/          # Custom pipes
│   │   └── directives/     # Custom directives
│   ├── app.routes.ts       # Routing configuration
│   └── app.ts              # Root component
└── styles.css              # Global styles
```

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
