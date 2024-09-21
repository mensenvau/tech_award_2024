import { PageSearch } from "@/components/pages/search";

export async function generateMetadata({ params, searchParams }, parent) {
    let title = searchParams?.title;
    let location = searchParams?.location || "N/A";
    if (title) {
        return {
            title: `${title} Jobs in ${location} - Jobgram | Find Your Next ${title} Job Today`,
            description: `Looking for ${title} jobs in ${location}? Jobgram helps you find the latest  ${title} job openings in your area. Browse now and apply to top companies. Start your ${title} career with us!.`,
        };
    }
}

export default function SubPage() {
    return <PageSearch />;
}
