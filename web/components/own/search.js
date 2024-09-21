"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchStore } from "@/lib/stores";
import { SubLayout } from "@/components/own/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Search() {
    const router = useRouter();

    const params = useSearchParams();
    const query = useSearchStore((state) => state.query);
    const setQuery = useSearchStore((state) => state.setQuery);
    const getQuery = useSearchStore((state) => state.getQuery);

    const updateQueryParameter = (key, value) => {
        setQuery(key, value);
        setQuery("page", 0);
    };

    const handleSearch = () => {
        const queryString = getQuery();
        router.push(`/?${queryString}`);
    };

    useEffect(() => {
        setQuery("title", params.get("title") || "");
        setQuery("location", params.get("location") || "");
    }, [params]);

    return (
        <SubLayout className="mt-5 md:mt-10">
            <div className="flex flex-col items-start w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-start mb-6">
                    🚀 Bugun yangi <span className="text-blue-500">ish</span> toping
                </h1>
                <p className="text-lg md:text-xl text-start text-opacity-70 mb-6">Menejment, savdo va texnologiya sohasida ko'plab imkoniyatlar mavjud va arizangizni kutmoqda.</p>
                <div className="grid grid-cols-5 w-full gap-2 md:gap-4">
                    <div className="col-span-5 md:col-span-2">
                        <Input type="text" className="h-15 flex-grow p-4 rounded-lg border border-gray-300" placeholder="Ish nomi, kalit so'zlar yoki kompaniya" value={query.title || ""} onChange={(e) => updateQueryParameter("title", e.target.value)} />
                    </div>
                    <div className="col-span-5 md:col-span-2">
                        <Input type="text" className="h-15 flex-grow p-4 rounded-lg border border-gray-300" placeholder="Mamlakat, shahar, tuman ..." value={query.location || ""} onChange={(e) => updateQueryParameter("location", e.target.value)} />
                    </div>
                    <div className="col-span-5 md:col-span-1">
                        <Button onClick={handleSearch} className="h-15 bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-3 px-8 rounded-lg transition-colors">
                            Ish qidirish
                        </Button>
                    </div>
                </div>
            </div>
        </SubLayout>
    );
}
