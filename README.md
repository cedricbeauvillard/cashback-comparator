# 💰 Cashback Comparator

<div align="center">
  
A comprehensive comparison platform for French cashback services, helping users find the best cashback rates across multiple providers.

[![Next.js](https://img.shields.io/badge/Next.js-12.2.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-4.4.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.1.8-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 📋 Overview

Cashback Comparator is a full-stack web application that aggregates and compares cashback rates from major French cashback platforms including:

- 🎯 **Igraal**
- 🐙 **Poulpeo**
- 💰 **eBuyClub**
- 🐨 **Capital Koala**
- 🎮 **Widilo**
- 💳 **Joko**
- 🏦 **Boursorama**
- 🎴 **Flouzy**

Users can search thousands of online retailers, compare cashback offers side-by-side, and discover the best deals across multiple platforms.

## ✨ Features

- **🔍 Advanced Search**: Find and compare cashback rates for thousands of online sellers
- **📊 Real-time Comparison**: View side-by-side comparison of cashback rates across 8+ platforms
- **🏆 Top Sellers**: Curated list of popular retailers with best cashback offers
- **📝 Admin Dashboard**: Secure backoffice for managing sellers and cashback rates
- **📥 Excel Import**: Bulk import/update sellers and rates via Excel files
- **📱 Responsive Design**: Fully optimized for desktop and mobile devices
- **🔗 SEO Optimized**: Dynamic sitemap generation and SEO-friendly URLs
- **🎨 Modern UI**: Built with Mantine and Tailwind CSS for a clean, professional look

## 🛠️ Technology Stack

- **Framework**: [Next.js 12](https://nextjs.org/) (React-based full-stack framework)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: MySQL with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Mantine UI](https://mantine.dev/)
- **State Management**: React Hooks
- **Forms**: Mantine Forms
- **Logging**: Pino
- **Containerization**: Docker
- **Sitemap**: next-sitemap
- **Notifications**: React Toastify

## 🚀 Getting Started

### Prerequisites

- Node.js 17.x or higher
- MySQL 8.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/cashback-comparator.git
   cd cashback-comparator
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/cashback_db"

   # Email configuration (for contact form)
   EMAIL_HOST="smtp.example.com"
   EMAIL_PORT="587"
   EMAIL_USER="your-email@example.com"
   EMAIL_PASSWORD="your-password"

   # reCAPTCHA (optional)
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-recaptcha-site-key"
   RECAPTCHA_SECRET_KEY="your-recaptcha-secret-key"

   # Admin credentials (for initial setup)
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="your-secure-password"
   ```

4. **Set up the database**

   ```bash
   # Run Prisma migrations
   npx prisma migrate deploy

   # Generate Prisma Client
   npx prisma generate

   # (Optional) Seed the database with initial data
   npx ts-node scripts/exToNewDbMigrator.ts
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Deployment

Build and run with Docker:

```bash
# Build the Docker image
docker build -t cashback-comparator .

# Run the container
docker run -p 3000:3000 --env-file .env cashback-comparator
```

## 📁 Project Structure

```
cashback-comparator/
├── components/           # React components
│   ├── business/        # Business logic components
│   ├── generic/         # Reusable UI components
│   └── svg/            # SVG icon components
├── lib/                 # Utility libraries
│   ├── api/            # API consumers
│   └── prisma.ts       # Prisma client instance
├── pages/              # Next.js pages and API routes
│   ├── api/           # REST API endpoints
│   ├── admin/         # Admin panel pages
│   └── seller/        # Dynamic seller pages
├── prisma/            # Database schema and migrations
├── public/            # Static assets
├── scripts/           # Database utilities and scripts
└── styles/            # Global styles and Tailwind config
```

## 🔐 Admin Panel

Access the admin panel at `/admin/login` with your configured credentials.

**Features:**

- Add, edit, and remove sellers
- Update cashback rates for all platforms
- Import/export data via Excel
- View user messages from contact form

## 📊 Database Schema

The application uses the following main models:

- **Seller**: Online retailers with cashback rates
- **Cashbacker**: Cashback platform information
- **Category**: Product/service categories
- **Administrator**: Admin user accounts
- **UserMessage**: Contact form submissions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 📧 Contact

For questions or support, please use the contact form on the website or reach out to the development team.

---

<div align="center">
Made with ❤️ using Next.js and TypeScript
</div>
