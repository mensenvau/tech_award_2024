"use client";

import { useFetch } from "@/library/request";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Charts } from "@/components/own/stat";
import { Loading } from "../own/loading";
import Image from "next/image";

export function PageChannels() {
    let { request, isLoading } = useFetch("force-cache");
    let [channels, setChannels] = useState([]);

    let getChannels = async () => {
        let { status, data } = await request("GET", "channels");
        if (status == 200) setChannels(data.channels);
    };

    useEffect(() => {
        getChannels();
    }, []);

    return (
        <div className="grid grid-cols-8 gap-4">
            <div className="col-span-8 md:col-span-6 py-4">
                <Card className="mx-auto cursor-pointer hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>📌 Telegramdagi vakansiya kanallari bilan tanishing</CardHeader>
                    <CardContent>
                        {!isLoading && channels.length === 0 && (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-center text-lg font-medium">Qidiruv mezoningizga mos keladigan kanallar topilmadi.</p>
                            </div>
                        )}

                        {isLoading && <Loading count={1} />}

                        {channels.length !== 0 && (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Username</TableHead>
                                        <TableHead>Members</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {channels.map((channel) => (
                                        <TableRow key={channel._id}>
                                            <TableCell>
                                                <Image alt="Channel" src={`${process.env.api}/profile/chat${channel.chat_id}.jpg`} width="40" height="40" />
                                            </TableCell>
                                            <TableCell className="font-medium">{channel.title}</TableCell>
                                            <TableCell>@{channel.username}</TableCell>
                                            <TableCell>{channel.member_count.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-8 md:col-span-2 py-4">
                <Charts />
            </div>
        </div>
    );
}
