import { PageJob } from "@/components/pages/job";

export async function generateMetadata({ params, searchParams }) {
    let job_name = searchParams?.job_name;
    let company_name = searchParams?.company_name;
    return {
        title: `Ish imkoniyati - ${job_name} da ${company_name} | Jobgram-da hozir murojaat qiling`,
        description: `${company_name} kompaniyasida ${job_name} sifatida yangi ish imkoniyatini toping. Jobgram-ga hoziroq murojaat qiling va karerangizda keyingi qadamni tashlang. Bugun o'z sohangizda ko'proq ish joylarini o'rganing!`,
    };
}

export default function SubPage({ params }) {
    return <PageJob params={params} />;
}
