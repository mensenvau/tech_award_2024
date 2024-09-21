"use client";

import { useEffect } from "react";
import { useSearchStore } from "@/lib/stores";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export function PaginationCompanent({ total }) {
    const router = useRouter();

    const params = useSearchParams();
    const query = useSearchStore((state) => state.query);
    const setQuery = useSearchStore((state) => state.setQuery);
    const getQuery = useSearchStore((state) => state.getQuery);

    const setPage = (value) => {
        setQuery("page", Math.min(Math.max(parseInt(value), 0), total));
        router.push(`?${getQuery()}`);
    };
    useEffect(() => {
        setQuery("page", params.get("page") || 0);
    }, [params]);

    let pages = [];
    for (let page = Math.max(parseInt(query.page) - 2, 0); page <= Math.min(parseInt(query.page) + 2, total); page++) {
        pages.push(page);
    }

    return (
        <div className="py-8">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => { setPage(parseInt(query?.page) - 1); }} />
                    </PaginationItem>
                    {pages.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => { setPage(page); }}
                                isActive={page == (query?.page || 0)}>
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => { setPage(parseInt(query?.page) + 1); }} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
