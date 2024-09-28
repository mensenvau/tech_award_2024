import { PageSearch } from "@/components/pages/search";

export async function generateMetadata({ params, searchParams }, parent) {
    let title = searchParams?.title;
    let location = searchParams?.location;
    if (title) {
        return {
            title: `${title}, ${location} da ish o'rinlari - Jobgram | Keyingi ${title} ishingizni bugun toping`,
            description: `${location} da ${title} ish qidiryapsizmi? Jobgram sizga hududingizdagi eng yangi ${title} ish joylarini topishga yordam beradi. Hozir ko'rib chiqing va eng yaxshi kompaniyalarga murojaat qiling. ${title} karerangizni biz bilan boshlang!.`,
        };
    }
}

export default function SubPage() {
    return <PageSearch />;
}
