"use client";

import { useEffect, useState } from "react";
import { useFetch } from "@/library/request";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ChartStat() {
    let { request } = useFetch("force-cache");
    let [country, setCountry] = useState([]);

    let getByCountry = async () => {
        let { status, data } = await request("GET", "country");
        if (status == 200) setCountry(data.charts);
    };

    useEffect(() => {
        getByCountry();
    }, []);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-2">📅 Ishga e'lonlar soni</CardTitle>
                </CardHeader>
                <CardContent>




                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="leading-none text-muted-foreground"> Showing total job postings for the last 7 days </div>
                </CardFooter>
            </Card>
        </div>
    );
}
