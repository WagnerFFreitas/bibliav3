
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const VerseLoadingSkeleton: React.FC = () => (
  <div className="space-y-4 p-4">
    <div className="space-y-2">
      <Skeleton className="h-6 w-3/4 bg-gray-700" />
      <Skeleton className="h-6 w-full bg-gray-700" />
      <Skeleton className="h-6 w-5/6 bg-gray-700" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-6 w-4/5 bg-gray-700" />
      <Skeleton className="h-6 w-full bg-gray-700" />
      <Skeleton className="h-6 w-2/3 bg-gray-700" />
    </div>
  </div>
);

export const ChapterLoadingSkeleton: React.FC = () => (
  <div className="space-y-6 p-4">
    <Skeleton className="h-8 w-1/2 mx-auto bg-gray-700" />
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-10 bg-gray-700" />
      ))}
    </div>
    <VerseLoadingSkeleton />
  </div>
);

export const SlideLoadingSkeleton: React.FC = () => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-black p-4">
    <div className="w-full max-w-6xl mx-auto text-center space-y-6">
      <Skeleton className="h-12 w-3/4 mx-auto bg-gray-700" />
      <Skeleton className="h-8 w-1/2 mx-auto bg-gray-700" />
      <div className="space-y-4 mt-8">
        <Skeleton className="h-6 w-full bg-gray-700" />
        <Skeleton className="h-6 w-5/6 mx-auto bg-gray-700" />
        <Skeleton className="h-6 w-4/5 mx-auto bg-gray-700" />
      </div>
    </div>
  </div>
);
