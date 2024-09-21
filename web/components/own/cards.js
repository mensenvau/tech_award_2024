"use client";

import { Calendar, Clock, DollarSign } from "lucide-react";
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
                    <CardTitle>{job.job_name}
                        {/* {isNew && (
                            <Badge variant="outline" className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                New
                            </Badge>
                        )} */}
                    </CardTitle>
                    <CardDescription>{job.company_name}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="sm:flex flex-wrap gap-2">
                        <JobDetail icon={CountryIcon} iconProps={{ code: job.country_code }} text={job.city} />
                        <JobDetail icon={Clock} text={job.job_type} />
                        <JobDetail icon={Calendar} text={moment(job.createdAt).fromNow()} />
                        <JobDetail icon={DollarSign} text={job.job_salary} />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

export function JobFullCard({ job }) {
    const now = moment().utc();
    const post = moment(job.createdAt).utc();

    return (
        <Card className="mx-auto cursor-pointer hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="text-xl">{job.job_name}</CardTitle>
                <CardDescription>{job.company_name}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Job details</p>
                    <div className="sm:flex flex-wrap gap-2">
                        <JobDetail icon={CountryIcon} iconProps={{ code: job.country_code }} text={job.city} />
                        <JobDetail icon={Clock} text={job.job_type} />
                        <JobDetail icon={Calendar} text={moment(job.createdAt).fromNow()} />
                        <JobDetail icon={DollarSign} text={job.job_salary} />
                    </div>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Full job description</p>
                    <p className="font-normal">{job.job_descriptions}</p>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Job responsibilities</p>
                    <ul className="list-disc list-inside">
                        {job.job_responsibilities.map((item, index) => (<li key={index}>{item}</li>))}
                    </ul>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg"> Job requirement skills</p>
                    <ul className="list-disc list-inside">
                        {job.requirement_skills.map((item, index) => (<li key={index}>{item}</li>))}
                    </ul>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Job occupations</p>
                    <ul className="list-disc list-inside">
                        {job.occupations.map((item, index) => (<li key={index}>{item}</li>))}
                    </ul>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Job additional comments</p>
                    <ul className="list-disc list-inside">
                        {job.additional_comments.map((item, index) => (<li key={index}>{item}</li>))}
                    </ul>
                </div>

                <div className="w-full py-2">
                    <p className="font-semibold	text-lg">Job contact informations</p>
                    <ul className="list-disc list-inside">
                        {job.contact_informations.map((item, index) => (
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
