# Modern Gallery

A modern, elegant photo gallery application built with Laravel, React, TypeScript, and Inertia.js.

## Features

- 🖼️ Beautiful photo gallery management
- 🔐 Secure authentication system
- 📱 Responsive design
- ⚡ Fast and modern UI with React
- 🎨 Beautiful UI with Tailwind CSS
- 🔒 Type-safe with TypeScript

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 18+ with TypeScript
- **Routing**: Inertia.js
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite

## Installation

1. Clone the repository:
```bash
git clone https://github.com/solymanHossen/photo-gallery.git
cd photo-gallery
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node dependencies:
```bash
npm install
```

4. Set up environment file:
```bash
cp .env.example .env
php artisan key:generate
```

5. Configure your database in `.env` file

6. Run migrations:
```bash
php artisan migrate
```

7. Start the development servers:
```bash
npm run dev
```

In another terminal:
```bash
php artisan serve
```

## Development

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run type-check` - Run TypeScript type checking
- `php artisan test` - Run PHP tests

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
