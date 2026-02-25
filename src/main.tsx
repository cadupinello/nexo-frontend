import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { SocketProvider } from "./shared/contexts/SocketContext";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  interface RouterContext {
    queryClient: QueryClient;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});


import { ErrorState } from "./shared/components/feedback/ErrorState";
import { NotFoundState } from "./shared/components/feedback/NotFoundState";
import { LoadingSpinner } from "./shared/components/ui/LoadingSpinner";

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultPendingComponent: () => (
    <div className="flex h-screen w-full items-center justify-center bg-bg-start">
      <LoadingSpinner size={40} />
    </div>
  ),
  defaultErrorComponent: ({ error }) => (
    <div className="flex h-screen w-full items-center justify-center bg-bg-start">
      <ErrorState
        title="Erro na aplicação"
        message={error instanceof Error ? error.message : "Algo inesperado aconteceu."}
        onRetry={() => window.location.reload()}
      />
    </div>
  ),
  defaultNotFoundComponent: () => (
    <div className="flex h-screen w-full items-center justify-center bg-bg-start">
      <NotFoundState />
    </div>
  ),
});

function AppRouter() {
  return (
    <RouterProvider
      router={router}
      defaultPreload="intent"
      context={{
        queryClient,
      }}
    />
  );
}



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <AppRouter />
        <Toaster position="top-right" richColors />
      </SocketProvider>
    </QueryClientProvider>
  </StrictMode>,
);
