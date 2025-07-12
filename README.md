![Arisevan](/public/common/logo_large.svg)
# About

This project is a personal blog built with Next.js, designed to manage and display articles. It features a custom backend for content management, accessible only to the blog owner, and integrates with AWS S3 for image uploads.

## Technologies Used

- **Next.js**: React framework for building web applications.
- **React**: Frontend library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **MongoDB**: NoSQL database for data storage.
- **AWS S3**: Cloud storage for image assets.
- **TypeScript**: Superset of JavaScript that adds static types.
- **MongoDB Integration**: Utilizes Prisma as an ORM for MongoDB.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or cloud-hosted)
- AWS S3 Bucket and IAM credentials

## Project Structure

-   `prisma/`: Prisma schema definition.
-   `public/`: Static files served directly.
-   `src/app/`: Next.js App Router pages and API routes.
    -   `(root)/`: Root level pages.
    -   `(dashboard)/`: Dashboard specific pages.
    -   `api/`: API endpoints.
-   `src/assets/`: Static assets like global CSS.
-   `src/components/`: Reusable React components.
-   `src/lib/`: Utility functions.
