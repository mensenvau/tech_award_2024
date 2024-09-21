import { PageJob } from "@/components/pages/job";

export async function generateMetadata({ params, searchParams }) {
    let job_name = searchParams?.job_name;
    let company_name = searchParams?.company_name;
    return {
        title: `Job Opportunity - ${job_name} at ${company_name} | Apply Now on Jobgram`,
        description: `Discover a new job opportunity as a ${job_name} at ${company_name}. Apply now on Jobgram and take the next step in your career. Explore more jobs in your industry today!`,
    };
}

export default function SubPage({ params }) {
    return <PageJob params={params} />;
}
