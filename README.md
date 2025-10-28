# BWGA Nexus AI - Intelligence Blueprint Generator

A comprehensive AI-powered platform for regional economic intelligence and strategic analysis.

## 🚀 Features

- **AI-Powered Intelligence Reports**: Generate detailed strategic reports using advanced AI
- **Regional Economic Analysis**: Comprehensive market research and opportunity identification
- **Interactive Report Builder**: Step-by-step wizard for creating customized intelligence reports
- **Real-time Data Integration**: Live market data and economic indicators
- **Multi-format Export**: PDF, PowerPoint, and Word document generation
- **Enterprise Security**: Enterprise-grade security and compliance features

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini AI
- **Charts**: Recharts
- **PDF Generation**: jsPDF, html2canvas

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini AI API key

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bwga-nexus-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. Start the development server:
```bash
npm run dev:full
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Server Deployment

```bash
npm run server
```

### Environment Variables for Production

Make sure to set these environment variables:

```env
GOOGLE_GENAI_API_KEY=your_production_api_key
NODE_ENV=production
PORT=3001
```

## 📁 Project Structure

```
├── components/          # React components
│   ├── common/         # Shared components
│   └── ...             # Feature components
├── services/           # API services
├── types.ts           # TypeScript definitions
├── constants.tsx      # Application constants
├── server.js          # Express server
└── dist/              # Production build output
```

## 🔒 Security

- Enterprise-grade security implementation
- API key protection
- Data encryption
- Compliance tracking and audit trails

## 📊 API Endpoints

- `POST /api/report` - Generate intelligence reports
- `POST /api/research-and-scope` - Research and analysis
- `GET /api/capabilities` - AI capabilities
- `GET /api/health` - Health check

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

© 2024 BWGA Global Advisory. All rights reserved.

## 📞 Support

For support, please contact BWGA Global Advisory.
