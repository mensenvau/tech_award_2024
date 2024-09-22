"use client";

import { Calendar, Clock, DollarSign, MapPin, Wallet2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

const CountryIcon = ({ code, ...props }) => {
    return <Image alt={`${code} flag`} width="24" height="24" src={`${process.env.api}/flags/${code}.svg`} {...props} />;
};

const JobDetail = ({ icon: Icon, text, iconProps }) => {
    return (
        <div className="flex gap-1 items-center self-stretch my-auto">
            <Icon {...iconProps} className="w-4 h-4" />
            <div className="self-stretch my-auto break-words">{text}</div>
        </div>
    );
};

const JobContactLink = ({ type, value }) => {
    let display = value.replace("https://", "").replace("http://", "");
    let link = value;
    if (type == "phone" || type == "tel" || type == "whatsapp") link = `tel:${value}`;
    if (type == "email") link = `mailto:${value}`;

    return (
        <a href={link} target="_blank">
            {display.slice(0, 20)}
        </a>
    );
};

export function JobCard({ job }) {

    return (
        <Link href={`/job/${job.id}?job_name=${job.job_name}&company_name=${job.company_name}`}>
            <Card className="my-4 mx-auto cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="text-lg">
                        <span className="mr-2">{job.job_name}</span>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                            Tasdiqlanmagan
                        </Badge>
                    </CardTitle>
                    <CardDescription>{job.company_name}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="sm:flex flex-wrap gap-2">
                        <JobDetail icon={MapPin} text={`${job.city} `} />
                        {/* <JobDetail icon={CountryIcon} iconProps={{ code: job.country_code }} text={job.city} /> */}
                        <JobDetail icon={Clock} text={job.job_type} />
                        <JobDetail icon={Calendar} text={moment(job.job_date).fromNow()} />
                        <JobDetail icon={Wallet2} text={job.job_salary} />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

export function JobFullCard({ data }) {
    let { job, job_locations, contact_informations, job_responsibilities, requirement_skills, occupations, additional_comments } = data;

    return (
        <Card className="mx-auto cursor-pointer hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="text-2xl">{job.job_name}</CardTitle>
                <CardDescription>{job.company_name}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Ish tafsilotlari</p>
                    <div className="sm:flex flex-wrap gap-2">
                        <JobDetail icon={CountryIcon} iconProps={{ code: job_locations.country_code }} text={`${job_locations.city}, ${job_locations.full_address}`} />
                        <JobDetail icon={Clock} text={job.job_type} />
                        <JobDetail icon={Calendar} text={moment(job.createdAt).fromNow()} />
                        <JobDetail icon={DollarSign} text={job.job_salary} />
                    </div>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">To'liq ish tavsifi</p>
                    <p className="font-normal">{job.job_descriptions}</p>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Ish majburiyatlari</p>
                    <ul className="list-disc list-inside">
                        {job_responsibilities.map((item, index) => (<li key={index}>{item.responsibility}</li>))}
                    </ul>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Ishga bo'lgan talab qobiliyatlari</p>
                    <ul className="list-disc list-inside">
                        {requirement_skills.map((item, index) => (<li key={index}>{item.skill}</li>))}
                    </ul>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Ish kasblari</p>
                    <ul className="list-disc list-inside">
                        {occupations.map((item, index) => (<li key={index}>{item.occupation}</li>))}
                    </ul>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Ish uchun qo'shimcha sharhlar</p>
                    <ul className="list-disc list-inside">
                        {additional_comments.map((item, index) => (<li key={index}>{item.comment}</li>))}
                    </ul>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Ish bilan bog'liq ma'lumotlar</p>
                    <ul className="list-disc list-inside">
                        {contact_informations.map((item, index) => (
                            <li key={index}>
                                <span className="font-semibold">{item.type}:</span> <JobContactLink type={item.type} value={item.value} />
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
