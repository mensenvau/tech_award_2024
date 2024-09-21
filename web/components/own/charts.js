"use client";

import { useEffect, useState } from "react";
import { useFetch } from "@/library/request";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const config = {
    count: { label: "Count", color: "hsl(var(--chart-1))" },
};

export function Charts() {
    let { request } = useFetch("force-cache");
    let [charts, setCharts] = useState([]);

    let getCharts = async () => {
        let { status, data } = await request("GET", "charts");
        if (status == 200) setCharts(data.charts);
    };

    useEffect(() => {
        getCharts();
    }, []);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-2">📅 Number of job postings</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={config}>
                        <BarChart accessibilityLayer data={charts}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="weekday" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="leading-none text-muted-foreground"> Showing total job postings for the last 7 days </div>
                </CardFooter>
            </Card>
        </div>
    );
}
