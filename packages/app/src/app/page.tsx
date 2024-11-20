"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import dynamic from "next/dynamic";
import { useState } from "react";
import Sidebar from "./components/navigation/sidebar";
import NavBar from "./components/navigation/navbar";

const PluginA = dynamic(() =>
  import("@internal/service-domain").then((mod) => mod.ServiceDomain)
);

const createQueryClient = new QueryClient();

export default function Home() {
  const [queryClient] = useState(createQueryClient);
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <NavBar />
          <main className="flex-1 overflow-y-auto">
            <QueryClientProvider client={queryClient}>
              <PluginA />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </main>
        </div>
      </div>
    </div>
  );
}
