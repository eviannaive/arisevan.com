![Arisevan Logo](/public/common/logo_large.svg)
# About This Project

This project is a Next.js application designed to manage and display articles, featuring user authentication and image uploads to AWS S3.

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

-   `src/app/`: Next.js App Router pages and API routes.
    -   `(root)/`: Root level pages.
    -   `(dashboard)/`: Dashboard specific pages.
    -   `api/`: API endpoints.
-   `src/assets/`: Static assets like global CSS.
-   `src/components/`: Reusable React components.
-   `src/models/`: Mongoose models (if any, though Prisma is used for main models).
-   `src/utils/`: Utility functions.
-   `prisma/`: Prisma schema definition.
-   `public/`: Static files served directly.
