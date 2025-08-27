# Fresh Ingredients Sourcing App

A modern web application that connects home cooks with fresh, quality ingredients for their favorite recipes. Simply select your dish, choose the quantity, and get all the ingredients delivered to your doorstep.

## 🚀 Features

- **Recipe-Based Shopping**: Pre-built ingredient lists for popular dishes like Jollof rice
- **Quantity Selection**: Customize portions based on your needs
- **Smart Cart System**: Add multiple recipes and ingredients to your cart
- **Seamless Billing**: Integrated payment processing
- **Fresh Ingredient Sourcing**: Direct connection with local suppliers

## 🛠️ Technologies Used

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Runtime**: Node.js

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

> **Tip**: Use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage Node.js versions

## 🏃‍♂️ Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   ```

2. **Navigate to the project directory**
   ```bash
   cd <YOUR_PROJECT_NAME>
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Options

This project can be deployed to various platforms:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload the build files to an S3 bucket
- **Any static hosting service**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Application pages
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── main.tsx        # Application entry point
├── package.json        # Project dependencies and scripts
└── README.md          # Project documentation
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions, please:
- Check the [Issues](../../issues) section
- Create a new issue if your problem isn't already reported

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for fresh, quality ingredients
- Designed for home cooks and culinary enthusiasts

---

**Happy Cooking! 🍳**
