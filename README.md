# Issue Tracker Project

This is a full-stack web application designed to help users track and manage issues or tasks. It provides features for creating, updating, assigning, and monitoring the status of issues, making it suitable for personal projects or small team collaboration.

## Features

- **User Authentication:** Secure sign-up and login functionality using NextAuth.js.
- **Issue Management:** Create, view, edit, and delete issues.
- **Status Tracking:** Assign statuses (e.g., Open, In Progress, Closed) to issues.
- **Issue Assignment:** Assign issues to users.
- **Dashboard:** View a summary of issues, including statistics and charts.
- **Responsive Design:** User interface adapts to different screen sizes.
- **Theme Toggle:** Switch between light and dark modes for user preference.
- **Sentry Integration:** Automatic error tracking and reporting for easier debugging.
- **Rich Text Editing:** Use a WYSIWYG editor for issue descriptions.
- **Pagination:** For lists of issues.
- **Filtering and Sorting:** For lists of issues.

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI Themes, DaisyUI
- **Forms:** React Hook Form
- **Schema Validation:** Zod
- **API Client:** Axios
- **Charting:** MUI X Charts
- **Markdown Editor:** EasyMDE / React SimpleMDE
- **Error Tracking:** Sentry
- **Package Manager:** pnpm

## Getting Started

This section will guide you through setting up the project locally.

### Prerequisites

Make sure you have the following software installed on your system:

- **Node.js:** v20.x (LTS recommended). You can download it from [nodejs.org](https://nodejs.org/).
- **pnpm:** v9.5.0 or later. If you don't have pnpm, you can install it via npm: `npm install -g pnpm`. See [pnpm.io/installation](https://pnpm.io/installation) for other installation methods.
- **MySQL:** The project uses MySQL as its database. Ensure you have a MySQL server running.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/issue-tracker.git # Replace with your fork or the original repo URL
    cd issue-tracker # Or your repository's directory name
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project. Since there is no `.env.example` file, you'll need to create it manually and add the following essential variables:

    ```env
    # Database connection URL (MySQL)
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

    # NextAuth.js secret - Generate a strong secret, e.g., using: openssl rand -hex 32
    NEXTAUTH_SECRET="your-very-secure-nextauth-secret"

    # NextAuth.js URL (default for local development)
    NEXTAUTH_URL="http://localhost:3000"

    # Optional: Google OAuth Credentials
    # GOOGLE_CLIENT_ID="your-google-client-id"
    # GOOGLE_CLIENT_SECRET="your-google-client-secret"

    # Optional: GitHub OAuth Credentials
    # GITHUB_ID="your-github-id"
    # GITHUB_SECRET="your-github-secret"

    # Optional: Twitter OAuth Credentials (ensure these are correct for your Twitter app version)
    # TWITTER_ID="your-twitter-id"
    # TWITTER_SECRET="your-twitter-secret"

    # Sentry DSN is currently hardcoded but can be overridden (optional)
    # SENTRY_DSN="your-sentry-dsn-if-you-want-to-override"
    ```
    Replace placeholder values (like `USER`, `PASSWORD`, `HOST`, `DATABASE_NAME`, and OAuth credentials) with your actual configuration. For OAuth providers, you'll need to register your application on their respective developer platforms to get client IDs and secrets.

4.  **Run database migrations:**
    This command will apply any pending database schema changes.
    ```bash
    pnpm prisma migrate dev
    ```

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application should now be running at [http://localhost:3000](http://localhost:3000).

## Available Scripts

This project uses `pnpm` as its package manager. Here are some of the main scripts available in the `package.json`:

-   **`pnpm dev`**:
    Starts the Next.js development server. You can view the application by navigating to `http://localhost:3000` in your browser. The server will automatically reload when you make changes to the code.

-   **`pnpm dev-inspect`**:
    Runs the Next.js development server with the Node.js inspector attached. This is useful for debugging server-side code. You can connect a debugger to the specified port (usually `9229`).

-   **`pnpm build`**:
    Compiles and builds the application for production deployment. This includes optimizing assets, code splitting, and other production-specific preparations. The output is typically generated in the `.next` folder.

-   **`pnpm start`**:
    Starts a Node.js server to serve the production build of the application (created by `pnpm build`). This is how you would run the application in a production environment.

-   **`pnpm lint`**:
    Runs ESLint to analyze the codebase for potential errors, style issues, and adherence to coding standards configured for the project (usually Next.js defaults).

-   **`pnpm postinstall`**:
    This is a special script that `pnpm` (and npm/yarn) automatically runs after the `pnpm install` command (or any other command that modifies `node_modules`) completes. In this project, it's used to run `prisma generate`, which generates the Prisma Client based on your `prisma/schema.prisma` file. This ensures your Prisma Client is always up-to-date with your database schema.

## Deployment

This Next.js application can be deployed to any platform that supports Node.js.

### Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details on deploying to Vercel and other platforms.

## Contributing

Contributions are welcome! If you have a feature request, bug report, or want to contribute to the code, please feel free to:

1.  Open an issue to discuss the change.
2.  Fork the repository and create a new branch for your feature or bug fix.
3.  Submit a pull request with a clear description of your changes.

Please ensure your code adheres to the project's linting standards (`pnpm lint`).

## License

This project is licensed under the MIT License. You can create a `LICENSE.md` file in the root of the project to include the full license text.
