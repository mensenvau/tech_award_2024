"use client";

import { Skeleton } from "../ui/skeleton";

export function Loading({ count }) {
    return (
        <div className="flex flex-col space-y-3">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-full rounded-md" />
                    <div className="space-y-2">
                        <Skeleton className="h-4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}
