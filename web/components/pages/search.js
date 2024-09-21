"use client";

import { useEffect, useState } from "react";
import { useFetch } from "@/library/request";
import { useSearchStore } from "@/library/stores";
import { PaginationCompanent } from "@/components/own/pagination";
import { Charts } from "@/components/own/charts";
import { JobCard } from "@/components/own/cards";
import { Loading } from "@/components/own/loading";

export function PageSearch() {
    let query = useSearchStore((state) => state.query);
    let getQuery = useSearchStore((state) => state.getQuery);

    let { request, isLoading } = useFetch();
    let [jobs, setJobs] = useState([]);
    let [data, setData] = useState([]);

    let getJobs = async () => {
        let { status, data } = await request("GET", `jobs?${getQuery()}`);
        if (status == 200) {
            setJobs(data.jobs);
            setData(data);
        }
    };

    useEffect(() => {
        getJobs();
    }, [query]);

    return (
        <div className="grid grid-cols-8 gap-4">
            <div className="col-span-8 md:col-span-6">
                {!isLoading && jobs.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-center text-lg font-medium">Qidiruv mezoningizga mos keladigan ish topilmadi.</p>
                    </div>
                )}

                {jobs.length !== 0 && (
                    <>
                        {jobs.map((job) => (<JobCard key={job.id} job={job} />))}
                        <PaginationCompanent total={data.total || 0} />
                    </>
                )}

                {isLoading && <Loading count={6} />}
            </div>
            <div className="col-span-8 md:col-span-2 py-4">
                <Charts />
            </div>
        </div>
    );
}
