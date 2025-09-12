
# Mesh.io LLM Onboarding Document

## Project Overview

**Mesh.io** is a web application designed to connect students and professionals for hackathons, projects, and other collaborative events. It serv
es as a platform for users to find teammates, post job opportunities, and discover upcoming events in the tech community.

The application is built with a modern tech stack, leveraging the power of Next.js for server-side rendering and static site generation, Clerk for seamless user authentication, and a PostgreSQL database managed with Prisma for robust data handling. The user interface is crafted with shadcn/ui and Tailwind CSS for a clean, modern aesthetic, and enhanced with animations powered by GSAP and Motion.

## Core Features

The platform's main functionalities are centered around creating a vibrant and interactive community for builders and innovators:

- **User Authentication**: Secure and easy user sign-up and sign-in functionality is handled by Clerk, providing a reliable authentication experience.
- **User Profiles**: Each user has a personal profile showcasing their name, email, university, and a list of their skills, making it easy for others to see their expertise.
- **Team and Project Creation**: Users can form teams for various projects, providing a space for collaboration and organization.
- **Vacancy Postings**: Teams can post vacancies for specific roles they need to fill, such as "Frontend Developer" or "UI/UX Designer," to attract the right talent.
- **Proposals and Applications**: Interested users can apply for these vacancies by submitting proposals, detailing their qualifications and interest in the project.
- **Event Listings**: The platform features a comprehensive list of upcoming events, including hackathons, workshops, and competitions, to keep the community engaged.
- **Personalized Dashboard**: A user-centric dashboard provides a snapshot of their profile, a list of upcoming events they are interested in, and a feed of their recent activities on the platform.
- **Lookout Feature**: A dedicated section to discover and connect with other users on the platform, making it easier to find potential collaborators and teammates.

## Tech Stack

- **Framework**: Next.js with TypeScript
- **UI Libraries**: React, shadcn/ui, Tailwind CSS
- **Animations**: GSAP, Motion
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel (inferred from the use of `@vercel/analytics`)

## Codebase Structure

The project follows a standard Next.js application structure, with a clear separation of concerns:

- **`app/`**: This directory contains all the pages and API routes for the application.
  - **`api/`**: Handles all backend logic, including creating proposals, managing vacancies, and handling user sign-in processes.
  - **`dashboard/`, `event/`, `lookout/`, `create-job/`, `signin/`, `signup/`, `upcoming/`**: These directories correspond to the main pages of the application, each containing the UI and logic for that specific feature.
- **`components/`**: This directory is home to all reusable React components.
  - **`ui/`**: Contains the collection of shadcn/ui components used throughout the application, ensuring a consistent design language.
- **`lib/`**: Includes utility functions and the Prisma client for database interactions.
- **`prisma/`**: This directory holds the Prisma schema definition, which is the single source of truth for the database structure.
- **`public/`**: Contains all static assets, such as images, logos, and other files that are publicly accessible.
- **`styles/`**: This directory contains global CSS styles and theme configurations for the application.

This structure ensures that the codebase is modular, maintainable, and easy to navigate for new developers joining the project.
