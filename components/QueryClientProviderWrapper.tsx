// app/QueryClientProviderWrapper.tsx

'use client'; // This makes the component a client component

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function QueryClientProviderWrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}