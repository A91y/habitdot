/* eslint-disable */
// @ts-nocheck

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "./pages/Explore/ChallengeExplore.tsx";
import Signup from "./pages/Signup/Signup.tsx";
import UserDashboard from "./pages/UserDashboard/UserDashboard.tsx";
import Layout from "./Layout.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import CreateChallenge from "./pages/CreateChallenge/CreateChallenge.tsx";
import { useUserStore } from "./store/user.ts";
import ChallengeDetails from "./pages/Explore/ChallengeDetails.tsx";
import AboutChallenge from "./pages/About/AboutChallenge.tsx";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { defineChain } from "@reown/appkit/networks";

const projectId = "f8ef7b36361ad53b3548178af0e84d0d";

// Define Moonbeam Network
const moonbeamNetwork = {
  id: 1284,
  name: "Moonbeam",
  rpcUrls: ["https://rpc.api.moonbeam.network"],
  blockExplorers: {
    default: {
      name: "Moonbeam Explorer",
      url: "https://moonbeam.moonscan.io",
    },
  },
  nativeCurrency: {
    name: "Glimmer",
    symbol: "GLMR",
    decimals: 18,
  },
};
const customNetwork = defineChain({
  id: 1284,
  caipNetworkId: 'eip155:1284',
  chainNamespace: 'eip155',
  name: 'Moonbeam',
  nativeCurrency: {
    decimals: 18,
    name: 'Glimmer',
    symbol: 'GLMR',
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.api.moonbeam.network"],
    },
  },
  blockExplorers: {
    default: { name: 'Moonbeam Explorer', url: 'https://moonbeam.moonscan.io' },
  },
  contracts: {
    // Add the contracts here
  }
})
const networks = [customNetwork]; // Only Moonbeam is included here

const metadata = {
  name: "HabitDot",
  description: "HabitDot App Description",
  url: "https://www.catoff.xyz",
  icons: ["https://www.catoff.xyz/favicon.ico"],
};

// Initialize Reown AppKit with Moonbeam Network
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  defaultNetwork: moonbeamNetwork.id,
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});

const ProtectedRoute = ({ children }: any) => {
  const { loggedIn } = useUserStore();

  return loggedIn ? (
    <Layout>{children}</Layout>
  ) : (
    <Layout showAppbar={false}>
      <App />
    </Layout>
  );
};

const UnProtectedRoute = ({ children }: any) => {
  return <Layout>{children}</Layout>;
};

const UnProtectedRouteWithoutAppBar = ({ children }: any) => {
  return <Layout showAppbar={false}>{children}</Layout>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <UnProtectedRoute>
        <CreateChallenge />
      </UnProtectedRoute>
    ),
  },
  {
    path: "/explore",
    element: (
      <UnProtectedRoute>
        <Explore />
      </UnProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <UnProtectedRouteWithoutAppBar>
        <Signup />
      </UnProtectedRouteWithoutAppBar>
    ),
  },
  {
    path: "/profile",
    element: (
      <UnProtectedRoute>
        <UserDashboard />
      </UnProtectedRoute>
    ),
  },
  {
    path: "/challenge/:id",
    element: (
      <UnProtectedRoute>
        <AboutChallenge />
      </UnProtectedRoute>
    ),
  },
  {
    path: "/challenge",
    element: (
      <UnProtectedRouteWithoutAppBar>
        <ChallengeDetails />
      </UnProtectedRouteWithoutAppBar>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
