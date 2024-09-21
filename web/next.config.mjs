/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        api: "http://127.0.0.1:3000", // "https://api.jobgram.org", //
        measurement_id: "G-BYMPRBHVSH",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "jobgram.org",
            },
            {
                protocol: "https",
                hostname: "api.jobgram.org",
            },
            {
                protocol: "https",
                hostname: "jobgram.menda.page",
            },
            {
                protocol: "https",
                hostname: "jgapi.menda.page",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
            },
        ],
    },
};

export default nextConfig;
