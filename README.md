# Retail Info Extractor

A Node.js application written in TypeScript that retrieves company information from Google Places API based on a given retail chain company name and address.

## Features

- Retrieves company information using Google Places API
- Extracts company name, address, phone number, and website
- Stores data in JSON format
- Built with TypeScript for type safety
- Follows SOLID and DRY principles
- Includes logging and error handling

## Prerequisites

- Node.js (v14 or higher)
- Google Places API key

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Copy `.env.example` to `.env` and add your Google Places API key:
```bash
cp .env.example .env
```
4. Edit `.env` and set your Google Places API key:
```
GOOGLE_PLACES_API_KEY=your_api_key_here
```

## Dependencies

### Runtime Dependencies

- **axios** (^1.6.2)
  - Purpose: HTTP client for making requests to Google Places API
  - Features: Promise-based, automatic JSON parsing, request/response interceptors

- **dotenv** (^16.3.1)
  - Purpose: Loads environment variables from .env file
  - Features: Secure configuration management, environment-specific settings

- **envalid** (^8.0.0)
  - Purpose: Environment variable validation and type coercion
  - Features: Type safety for environment variables, default values, custom validators

- **winston** (^3.11.0)
  - Purpose: Logging framework for application events and errors
  - Features: Multiple log levels, custom formatters, various output transports

### Development Dependencies

- **TypeScript** (^5.3.2)
  - Purpose: Static typing and modern JavaScript features
  - Features: Type safety, interfaces, decorators, modern ECMAScript support

- **ts-node** (^10.9.1)
  - Purpose: Run TypeScript files directly without compilation
  - Features: Fast development workflow, source map support

- **ESLint** (^8.54.0) & TypeScript ESLint
  - Purpose: Code linting and style enforcement
  - Packages:
    - @typescript-eslint/eslint-plugin (^6.12.0)
    - @typescript-eslint/parser (^6.12.0)
  - Features: TypeScript-aware linting rules, code style consistency

- **Prettier** (^3.1.0)
  - Purpose: Code formatting
  - Features: Consistent code style, integrates with ESLint

- **@types/node** (^20.10.0)
  - Purpose: TypeScript type definitions for Node.js
  - Features: Type safety for Node.js APIs

## System Requirements

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Google Places API key (for accessing the Google Places API)

## Usage

### Build the project:
```bash
npm run build
```

### Run the application:
```bash
npm start
```

### Development mode:
```bash
npm run dev
```

### Example usage in code:
```typescript
import { RetailInfoExtractor } from './src';

const extractor = new RetailInfoExtractor();
const input = {
  name: 'Walmart',
  address: '123 Main St, Anytown, USA'
};

extractor.extractCompanyInfo(input)
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error.message));
```

## Output Format

The application returns data in the following JSON format:
```json
{
  "platform": "Google",
  "companyName": "Company Name",
  "address": "Company Address",
  "phoneNumber": "Phone Number",
  "website": "Website URL"
}
```

## Error Handling

The application includes comprehensive error handling for:
- Invalid input validation
- API errors
- Network timeouts
- Missing or incorrect API keys

## Logging

Logs are written to:
- `error.log` for error-level logs
- `combined.log` for all logs
- Console output for development

## License

ISC
