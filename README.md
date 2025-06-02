# UserManager 👥

A modern, full-stack web application for efficient user management with a beautiful interface and comprehensive backend API. Built with cutting-edge technologies for optimal performance and developer experience.

![UserManager Screenshot](https://via.placeholder.com/800x400/6366f1/ffffff?text=UserManager+Dashboard)

## 🌟 Features

### Frontend Features

- **🏠 Home Page**: Clean hero section with application overview
- **👥 User Management**: View and organize all users in one beautiful interface
- **➕ Add New Users**: Intuitive form system for creating new users
- **🔍 Smart Search**: Powerful search functionality to find users quickly
- **📱 Responsive Design**: Optimized for Mobile, Tablet, and Desktop
- **🎨 Modern UI**: Built with TailwindCSS and ShadCN/UI components

### Backend Features

- **🔒 Secure & Safe**: Enterprise-grade data protection
- **📊 Complete CRUD Operations**: Full user lifecycle management
- **✅ Data Validation**: Comprehensive input validation and error handling
- **📖 API Documentation**: Interactive API docs with Scalar integration
- **🐳 Docker Ready**: Containerization support for easy deployment

## 🚀 Tech Stack

### Frontend

- **React** - Modern UI library
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Powerful data fetching and caching
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **ShadCN/UI** - High-quality component library
- **TypeScript** - Type safety and better DX

### Backend

- **Bun** - Fast JavaScript runtime
- **Hono** - Lightweight web framework
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Robust relational database
- **Hono OpenAPI** - API documentation and validation
- **TypeScript** - End-to-end type safety

## 📋 Database Schema

### User Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  department VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Field Validations

- **Name**: Required string
- **Email**: Required, unique, valid email format
- **Phone**: Required, numeric, minimum 10 characters
- **Is Active**: Boolean status flag
- **Department**: Required string
- **Created At**: Auto-generated timestamp
- **Updated At**: Auto-updated timestamp

## 🛠️ Installation & Setup

### Prerequisites

- **Bun** >= 1.0.0
- **PostgreSQL** >= 14
- **Node.js** >= 18 (for client development)
- **Docker** (optional, for containerization)

### Environment Variables

Create a `.env` file in the server directory:

```env
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=usermanager_db
NODE_ENV=development
PORT=9999
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5431/${POSTGRES_DB}
```

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd usermanager
   ```

2. **Setup PostgreSQL Database**

   ```bash
   # Using Docker (recommended)
   docker run --name postgres-usermanager \
     -e POSTGRES_USER=your_username \
     -e POSTGRES_PASSWORD=your_password \
     -e POSTGRES_DB=usermanager_db \
     -p 5431:5432 \
     -d postgres:15
   ```

3. **Install Dependencies & Build Client**

   ```bash
   # Install client dependencies
   cd client
   npm install

   # Build client for production
   npm run build

   # Copy build files to server static directory
   cp -r dist/* ../server/static/
   ```

4. **Setup Server**

   ```bash
   cd ../server
   bun install

   # Run database migrations
   bun run db:migrate

   # Seed database (optional)
   bun run db:seed
   ```

5. **Start Development Server**

   ```bash
   bun run dev
   ```

6. **Access the Application**
   - **Frontend**: http://localhost:9999
   - **API Documentation**: http://localhost:9999/api/v1/reference

## 🐳 Docker Deployment

### Using Docker Compose

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "9999:9999"
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/usermanager
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: usermanager
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Build and Deploy

```bash
# Build the application
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f
```

## 📚 API Documentation

### Base URL

```
http://localhost:9999/api/v1
```

### Endpoints

#### Users

- `GET /users` - Get all users with optional search
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Interactive Documentation

Visit `/api/v1/reference` for complete interactive API documentation powered by Scalar.

### Example API Usage

#### Create User

```bash
curl -X POST http://localhost:9999/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "department": "Engineering",
    "isActive": true
  }'
```

#### Search Users

```bash
curl "http://localhost:9999/api/v1/users?search=john"
```

## 🏗️ Project Structure

```
usermanager/
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── routes/        # Application pages
│   │   ├── lib/           # Utilities and configurations
│   │   └── hooks/         # Custom React hooks
│   ├── public/            # Static assets
│   └── dist/              # Build output
├── server/                # Backend Hono application
│   ├── src/
│   │   ├── db/            # Database schema and migrations
│   │   ├── helpers/       # Utility functions
│   │   ├── libs/          # External integrations
│   │   ├── middlewares/   # HTTP middlewares
│   │   └── users/         # User-related endpoints
│   ├── static/            # Served static files (built client)
│   └── drizzle.config.ts  # Drizzle ORM configuration
├── shared/                # Shared types and utilities
└── docker-compose.yml     # Docker configuration
```

## 🚀 Deployment

### Production Build Process

1. **Build Client**

   ```bash
   cd client
   npm run build
   cp -r dist/* ../server/static/
   ```

2. **Deploy Server**
   ```bash
   cd server
   bun run build
   bun start
   ```

### Deployment Platforms

- **Railway**: Easy PostgreSQL + Bun deployment
- **Render**: Full-stack application hosting
- **Vercel**: Frontend with serverless functions
- **DigitalOcean**: VPS deployment with Docker

## 🧪 Development

### Available Scripts

#### Client

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start server
```

#### Server

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun start            # Start production server
bun run db:migrate   # Run database migrations
bun run db:studio    # Open Drizzle Studio
```

### Code Quality

- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Prettier** - Code formatting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: [[GitHub Repository URL](https://github.com/immalino/user-manager)]
- **Live Demo**: [[Deployed Application URL](usermanager.leedude.xyz)]
- **API Documentation**: [[API Docs URL](usermanager.leedude.xyz/api/v1/reference)]
- **Docker Image**: [[Docker Image Url](https://hub.docker.com/r/immalino/user-manager-app)]

## 📞 Support

If you have any questions or need help, please:

1. Check the documentation
2. Open an issue on GitHub
3. Contact the development team

---

**Built with ❤️ for efficient user management**
