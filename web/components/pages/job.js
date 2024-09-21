"use client";

import { useEffect, useState } from "react";
import { useFetch } from "@/library/request";
import { Charts } from "@/components/own/charts";
import { Loading } from "@/components/own/loading";
import { JobFullCard } from "@/components/own/cards";

export function PageJob({ params }) {
    let { request, isLoading } = useFetch();
    let [job, setJob] = useState(null);

    let getJobs = async () => {
        let { status, data } = await request("GET", `job/${params.id}`);
        if (status == 200) {
            setJob(data.job);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    return (
        <div className="grid grid-cols-8 gap-4">
            <div className="col-span-8 md:col-span-6 py-4">
                {job && <JobFullCard job={job} />}
                {isLoading && <Loading count={1} />}
            </div>
            <div className="col-span-8 md:col-span-2 py-4">
                <Charts />
            </div>
        </div>
    );
}
