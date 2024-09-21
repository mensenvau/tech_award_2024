"use client";

import { useEffect, useState } from "react";
import { useFetch } from "@/lib/request";
import { ChartStat } from "@/components/own/stat";
import { Loading } from "@/components/own/loading";
import { JobFullCard } from "@/components/own/cards";

export function PageJob({ params }) {
    let { request, isLoading } = useFetch();
    let [data, setData] = useState(null);

    let getJobs = async () => {
        let { status, data } = await request("GET", `job/${params.id}`);
        if (status == 200) { setData(data); }
    };

    useEffect(() => { getJobs(); }, []);

    return (
        <div className="grid grid-cols-8 gap-4">
            <div className="col-span-8 md:col-span-6 py-4">
                {data && <JobFullCard data={data} />}
                {isLoading && <Loading count={1} />}
            </div>
            <div className="col-span-8 md:col-span-2 py-4">
                <ChartStat key={2} />
            </div>
        </div>
    );
}
