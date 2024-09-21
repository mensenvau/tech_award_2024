import { PageChannels } from "@/components/pages/channels";

export async function generateMetadata({ params, searchParams }) {
    return {
        title: `Ish kanallarini o'rganing - Eng so'nggi ish ro'yxatini toping | Jobgram`,
        description: `Jobgram-dagi turli kanallar bo'ylab keng ko'lamli ish imkoniyatlarini kashf eting. O'zingizning mukammal martaba mosligini topish uchun bir nechta soha va joylarda eng so'nggi ish ro'yxatlarini ko'rib chiqing. Ish qidirishni bugunoq boshlang!`,
    };
}

export default function SubPage() {
    return <PageChannels />;
}
