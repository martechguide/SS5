# Overview

This is a full-stack educational video learning platform available in both Node.js/React (development) and PHP (production deployment) versions. The application provides structured learning through batches and subjects, with video content delivery and progress tracking. 

**Production Version**: Complete PHP-based system successfully deployed on CloudPanel hosting at learnherefree.online domain with PHP 8.4 configuration, MySQL database integration, automatic user signup, and comprehensive admin panel.

**Development Version**: React/Express/PostgreSQL stack with Replit OAuth authentication for development and testing.

The platform includes comprehensive ad monetization with Adsterra network integration for high-CPM revenue generation.

## Recent Deployment Success (August 13, 2025)
- ✅ Successfully deployed on CloudPanel hosting platform
- ✅ PHP 8.4 configuration active at learnherefree.online
- ✅ Database "eduplatform" created with user credentials
- ✅ PHP files uploaded and serving correctly
- ✅ Educational platform accessible via php-preview.php
- ✅ Complete index.php educational platform created and deployed
- ✅ SSH access established and index.php file placed in /home/eduplatform/htdocs/learnherefree.online
- ✅ Full-featured educational platform with login system, courses, and video streaming ready

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the bundler
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Replit OAuth with OpenID Connect using Passport.js
- **Session Management**: Express sessions with PostgreSQL storage
- **API Design**: RESTful API with role-based access control

## Database Design

### Development Version (PostgreSQL)
- **ORM**: Drizzle with PostgreSQL dialect
- **Schema Structure**:
  - Users table for authentication (required for Replit Auth)
  - Sessions table for session storage (required for Replit Auth)
  - Email whitelist table for access control
  - Batches table for organizing learning content
  - Subjects table nested under batches
  - Videos table nested under subjects
  - User progress tracking table

### Production Version (MySQL/Hostinger)
- **Database**: MySQL 5.7+ with PDO connections
- **Credentials**: u693225584_learning_new database with u693225584_webadmin user
- **Schema Structure**: Same as development but optimized for MySQL
- **Security**: Prepared statements for SQL injection prevention
- **Session Storage**: MySQL-based session handling for shared hosting compatibility

## Authentication & Authorization

### Development Version (Node.js)
- **Primary Auth**: Replit OAuth integration with Google Sign-In
- **Access Control**: Email whitelist system - only approved emails can access content
- **Session Handling**: Server-side sessions with PostgreSQL storage
- **Route Protection**: Middleware-based authentication checks on all protected routes

### Production Version (PHP/Hostinger)
- **Automatic Signup**: Any valid email can create account instantly without approval
- **Admin System**: Role-based access with automatic admin assignment for predefined emails
- **Session Management**: PHP sessions with MySQL storage
- **Database Integration**: Direct MySQL connection optimized for Hostinger shared hosting
- **User Management**: Complete admin panel for user control (view, approve, block, delete)

## Content Management
- **Video Management - Hierarchical Structure**: Batches → Subjects → Videos
- **Video Integration**: YouTube video embedding with privacy-enhanced URLs and comprehensive protection system
- **Universal Protection System**: Standardized `VideoProtectionSystem` component applied to ALL video embeds automatically
- **Mandatory Implementation**: Every video embed MUST use `VideoProtectionSystem` for consistent blocking functionality
- **Transparent Protection**: All blocking patches are transparent by default with hover visibility (black 80% opacity on hover)
- **Full-Width Coverage**: Top blocker covers entire player width to prevent mobile "Y" visibility
- **Black Video ID Patch**: Bottom center patch remains permanently black to hide video ID numbers
- **Hover Feedback**: Interactive areas become visible on hover to show protection zones
- **Future-Proof Design**: All new video components automatically inherit protection when using the universal system
- **Responsive Design**: Protection patches adapt to mobile, tablet, and desktop viewports with percentage-based positioning
- **Progress Tracking**: User watch time and completion status tracking
- **Video Seeking Controls**: Custom forward/backward seeking with interactive timeline
- **Hover Controls**: Video controls appear on hover with play/pause, skip, and volume
- **Timeline Scrubbing**: Interactive seek bar for precise video navigation

## Video Monetization System
- **Comprehensive Multi-Platform Integration**: 20 ad networks including:
  - Premium Networks: AdThrive ($25-40 CPM), Taboola ($8-20 CPM), Mediavine ($20-35 CPM), VDO.ai ($18-30 CPM)
  - High-Performance Networks: Adsterra ($15-25 CPM), Connatix ($12-25 CPM), Monumetric ($12-22 CPM), RevContent ($5-18 CPM)
  - Content Discovery: Outbrain ($6-18 CPM), Amazon Publisher Services ($7-16 CPM), Media.net ($6-15 CPM)
  - Reliable Networks: Google AdSense ($8-15 CPM), Ezoic ($8-18 CPM), Sovrn ($6-14 CPM)
  - Universal Networks: PropellerAds ($5-12 CPM), Meta Audience Network ($7-12 CPM), MGID ($4-12 CPM)
  - Quick Approval: ExoClick ($3-8 CPM), HilltopAds ($3-10 CPM) with weekly payments
- **Revenue Potential**: $30-60 per 1,000 views with optimized 20-platform setup
- **Ad Types**: Pre-roll video ads (highest CPM), mid-roll ads, banner overlays, post-roll display ads
- **MonetizedVideoPlayer**: Advanced video component with integrated ad management and real-time earnings tracking
- **VideoAdManager**: Handles multiple ad networks simultaneously with automatic fallback systems
- **Revenue Analytics**: Live earnings tracking, CPM monitoring, completion rate analysis, platform performance comparison
- **Geographic Optimization**: Tier 1 countries (US/UK/CA) generate 300-500% higher CPMs than global average
- **Mobile-First Design**: Responsive ad placements optimized for 60% mobile traffic
- **Content Protection**: Video protection system maintained while enabling monetization
- **Setup Guide**: Complete `/monetization` page with platform comparisons, implementation steps, and live demo
- **Implementation Ready**: Production-ready components with placeholder configuration for immediate deployment

## Adsterra Network Integration
- **High CPM Rates**: $2-8 per 1,000 impressions with eCPM optimization model
- **Fast Approval**: No traffic minimums, quick publisher registration process
- **Payment Terms**: NET-15 payments via PayPal, wire transfer, Paxum, cryptocurrency
- **Real API Integration**: Publisher API endpoints for stats, placements, and domain management
- **Ad Formats**: Banner (728x90, 320x50, 300x250), Native content ads, Popunders, Social bars
- **Responsive Components**: `AdsterraBanner` and `ResponsiveAdsterraBanner` with device-specific sizing
- **Admin Dashboard**: Dedicated Adsterra tab with configuration, performance metrics, and code generation
- **Non-Intrusive Strategy**: Bottom banner placement only to maintain user experience
- **Location Controls**: Activate/deactivate ads per page location with revenue tracking
- **Code Generation**: Automatic ad code generation with proper Adsterra script integration



## Development Environment
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Hot Reload**: Vite dev server with HMR for development
- **Database Migrations**: Drizzle Kit for schema management

# External Dependencies

## Core Services
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Authentication Provider**: Replit OAuth service
- **Video Content**: YouTube (embedded via privacy-enhanced nocookie domain)

## Key Libraries
- **UI Framework**: React 18 with TypeScript
- **Backend Framework**: Express.js with TypeScript
- **Database**: Drizzle ORM with Neon PostgreSQL driver
- **Authentication**: Passport.js with OpenID Connect strategy
- **Form Validation**: Zod schema validation
- **Styling**: Tailwind CSS with Radix UI components
- **State Management**: TanStack Query for API state

## Development Tools
- **Bundler**: Vite with React plugin
- **Type Checking**: TypeScript compiler
- **CSS Processing**: PostCSS with Tailwind and Autoprefixer
- **Development Server**: Express with Vite middleware integration

## Environment Requirements
- Node.js runtime with ES modules support
- PostgreSQL database connection
- Replit environment variables for OAuth configuration
- Session secret for secure session management