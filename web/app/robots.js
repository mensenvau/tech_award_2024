const robots = () => {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://jobgram.org/sitemap.xml",
    };
};

export default robots;
