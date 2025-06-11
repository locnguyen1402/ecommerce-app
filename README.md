# React Native Ecommerce App

A comprehensive React Native ecommerce application built with Expo, featuring modern tech stack and best practices.

## Tech Stack

- **Framework**: React Native with Expo Router
- **Package Manager**: Yarn v4
- **UI Components**: React Native Reusables + NativeWind v4
- **State Management**: 
  - Zustand for client state
  - TanStack Query for server state
- **Forms**: React Hook Form + Yup validation
- **Styling**: NativeWind v4 (TailwindCSS for React Native)
- **Internationalization**: react-i18next (English/Vietnamese)
- **Navigation**: Expo Router with typed routes
- **Storage**: AsyncStorage with Zustand persistence

## Features

✅ **Complete Ecommerce Functionality**
- Product browsing with categories
- Shopping cart with persistence
- Product detail modal
- Checkout process
- User profile management

✅ **Modern UI/UX**
- Dark/Light theme support
- Responsive design
- Professional ecommerce styling
- Toast notifications
- Loading states and error handling

✅ **Development Experience**
- TypeScript with strict mode
- Path aliases for clean imports
- Comprehensive type definitions
- Hot reload with Expo

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn v4
- Expo CLI

### Installation

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   yarn start
   ```

3. Run on device/simulator:
   ```bash
   # iOS
   yarn ios
   
   # Android  
   yarn android
   
   # Web
   yarn web
   ```

## Available Scripts

- `yarn start` - Start Expo development server
- `yarn android` - Run on Android device/emulator
- `yarn ios` - Run on iOS device/simulator  
- `yarn web` - Run in web browser
- `yarn test` - Run Jest tests
