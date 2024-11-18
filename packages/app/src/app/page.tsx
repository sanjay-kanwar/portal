"use client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import dynamic from "next/dynamic";
// import { useState } from "react";
// import Sidebar from "./components/navigation/sidebar";
// import NavBar from "./components/navigation/navbar";

// const PluginA = dynamic(() =>
//   import("@internal/jira-dashboard").then((mod) => mod.jiraDashboardPage)
// );

// const createQueryClient = new QueryClient();

export default function Home() {
  // const [queryClient] = useState(createQueryClient);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <NavBar />
          <main className="p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <QueryClientProvider client={queryClient}>
                <PluginA />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </div>
          </main>
        </div>
      </div> */}

      <>Test</>
    </div>
  );
}
