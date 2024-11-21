'use client';

import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type ServiceDomain = {
  id: number;
  title: string;
  description: string;
};

type Page = {
  nextPage: number;
  hasMore: boolean;
  domains: ServiceDomain[]; 
};

const fetchItems = async (context :QueryFunctionContext): Promise<Page> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const pageParam = context.pageParam as number || 0;
  const newItems = Array.from({ length: 10 }, (_, i) => ({
    id: pageParam * 10 + i + 1,
    title: `Item ${pageParam * 10 + i + 1}`,
    description: `This is the description for item ${pageParam * 10 + i + 1}.`,
  }));
  return { domains: newItems, nextPage: pageParam + 1, hasMore: pageParam < 10 };
};

export default function ServiceDomain() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<Page>({
    queryKey: ["items"],
    queryFn: fetchItems,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 0,
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      ) : isError ? (
        <div className="text-center text-error">Error fetching data</div>
      ) : (
        <div className="w-full grid gap-2 lg:grid-cols-4 grid-cols-2 sm:grid-cols-1">
          {data?.pages?.map((page) => {
            return page.domains?.map((domain) => (
              <div key={domain.id} className="card bg-base-100 ">
                <div className="card-body">
                  <h2 className="card-title">{domain.title}</h2>
                  <p>{domain.description}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">{domain.title}</button>
                  </div>
                </div>
              </div>
            ));
          })}
        </div>
      )}
      <div
        ref={observerTarget}
        className="flex justify-center items-center h-16 mt-4"
      >
        {isFetchingNextPage && (
          <div className="h-6 w-6 animate-spin text-blue-500">Loading</div>
        )}
      </div>
      {!hasNextPage && data && data.pages?.length > 0 && (
        <p className="text-center mt-4 text-gray-500">No more items to load</p>
      )}
    </>
  );
}
