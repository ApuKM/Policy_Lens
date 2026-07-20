PolicyLensAn AI-powered civic and legal technology platform designed to make complex local laws, city ordinances, and tech regulations accessible to everyday citizens, startup founders, and community leaders. PolicyLens automatically translates dense legal jargon into plain English, empowering users to quickly understand how upcoming or passed legislation affects them.🚀 Live Demo & RepositoryLive Website URL: [Insert Live URL here]Frontend & Backend Repository: [Insert GitHub Repository URL here]✨ Core Features🧠 Agentic AI CapabilitiesAI Document Intelligence (Feature F): When a contributor uploads a dense legal PDF, the system automatically parses the text and passes it through an LLM. It generates a plain-English, 3-sentence summary alongside a structured extraction of key action items and impacts.Context-Aware AI Chat Assistant (Feature C): Every policy details page features an embedded, interactive chat assistant powered by the Vercel AI SDK. The assistant uses the specific text of that policy as its knowledge base, allowing users to ask targeted, situational questions (e.g., "How does this affect small software businesses?").🖥️ Full-Stack & UI FeaturesDynamic Policy Directory: A public-facing, grid-based discovery system with 4 cards per row on desktop. Users can search and filter legislation seamlessly by Category and Status.Authenticated Contributor Dashboard: A secure section allowing verified contributors to upload new policy documents via a drag-and-drop file interface, as well as manage or delete past submissions.Secure Cloud Storage: Integrated with UploadThing for fast, production-ready, and secure legal PDF hosting.Mathematical UI Consistency: Built strictly with HeroUI and Tailwind CSS to maintain uniform component shapes, unified border-radiuses, typography, and fluid mobile responsiveness.Production-Ready Authentication: Powered by Better Auth with complete route protection, route redirection, and a dedicated Demo Login capability for graders.🛠️ Technology StackLayerTechnology UsedFrontend FrameworkNext.js 15 (App Router) & TypeScriptUI & StylingHeroUI (NextUI), Tailwind CSS, Lucide React IconsData FetchingTanStack Query (React Query)Database & ORMMongoDB & Prisma ORMAuthenticationBetter Auth (with Google OAuth & Credentials Provider)File StorageUploadThing (Cloud PDF Hosting)AI InfrastructureVercel AI SDK & OpenAI / Gemini APIPDF Parsingpdf-parse⚙️ Environment Variables SetupCreate a .env file in the root directory and configure the following keys:Code snippet# Database Connection
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/policylens"

# Better Auth Configuration
BETTER_AUTH_SECRET="your_super_secret_jwt_and_auth_key"
BETTER_AUTH_URL="http://localhost:3000" # Change to production URL on deployment

# Google OAuth (Required for Social Login)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# UploadThing (File Cloud Storage)
UPLOADTHING_TOKEN="your_uploadthing_token"

# AI Integration
OPENAI_API_KEY="your_openai_or_gemini_api_key"
🏃‍♂️ Getting Started1. Clone the RepositoryBashgit clone https://github.com/your-username/policylens.git
cd policylens
2. Install DependenciesBashnpm install
3. Initialize Prisma ClientBashnpx prisma generate
4. Run the Development ServerBashnpm run dev
Open http://localhost:3000 in your browser to view the application.