import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-10">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200"> 404 </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Oops! The page you're looking for doesn't exist.</p>
                <Link href="/" className="mt-4 inline-block bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600 transition duration-300">
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
}
