"use client";

import { useEffect, useState } from "react";
import { useFetch } from "@/lib/request";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import Link from "next/link";

export function ChartStat() {
    let { request } = useFetch();
    let [country, setCountry] = useState([]);

    let getByCountry = async () => {
        let { status, data } = await request("GET", "country");
        if (status == 200) setCountry(data.country);
    };

    useEffect(() => {
        getByCountry();
    }, []);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-2">🌍 Shaharlar:</CardTitle>
                </CardHeader>
                <CardContent>
                    {country.map((item, index) => (
                        <div key={index} >
                            <div className="text-sm">
                                <Link href={`?location=${item.city}`}>{item.city || "N/A"} - {item.count}</Link>
                            </div>
                            <Separator className="my-2" />
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">Eng top 10ta ish vakansiyalari shaharlar bo'yicha.</div>
                </CardFooter>
            </Card>
        </div>
    );
}
