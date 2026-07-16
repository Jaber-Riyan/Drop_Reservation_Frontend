# Drop Reservation Frontend

A React + TypeScript + Vite application for managing sneaker drop reservations with real-time updates via WebSocket.

## Features

- Browse available sneaker drops
- Real-time stock updates via WebSocket
- Reserve drops with countdown timer
- Complete purchases
- Create new drops (admin)
- Real-time reservation status updates
- Toast notifications for all actions

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see backend repository)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Jaber-Riyan/Drop_Reservation_Frontend.git
cd Drop_Reservation_Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:8080
```

**Note:** Replace `http://localhost:8080` with your backend API URL.

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | `http://localhost:4000` | Yes |

## Project Structure

```
src/
├── api/              # API service functions
│   ├── axios.ts      # Axios configuration
│   ├── drop.api.ts   # Drop-related API calls
│   ├── reservation.api.ts
│   └── purchase.api.ts
├── components/       # Reusable UI components
│   ├── DropCard.tsx
│   ├── Toast.tsx
│   └── Countdown.tsx
├── hooks/            # Custom React hooks
│   ├── useAuth.ts
│   └── useReservation.ts
├── pages/            # Page components
│   ├── DashboardPage.tsx
│   ├── CreateDropPage.tsx
│   └── ReservationPage.tsx
├── providers/        # React context providers
│   └── SocketProvider.tsx
├── socket/           # WebSocket configuration
│   ├── socket.ts
│   └── events.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Utility functions
│   └── queryClient.ts
└── router/           # React Router configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
   - Option 1: Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Option 2: Use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod
     ```
   - Option 3: Connect Git repository for continuous deployment

The `netlify.toml` and `public/_redirects` files are already configured for SPA routing.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Query (TanStack Query)** - Data fetching and caching
- **Socket.io Client** - Real-time WebSocket communication
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## WebSocket Events

The application listens to the following real-time events:

- `drop:stock_updated` - Updates drop stock in real-time
- `reservation:created` - Refreshes reservations list
- `reservation:expired` - Removes expired reservations
- `purchase:completed` - Removes purchased reservations
- `activity:purchase_created` - Updates activity feed

## License

MIT