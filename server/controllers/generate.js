/* sitemap generate every day one time */
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { format } = require('date-fns');
const { execute } = require('uzdev/mysql');

let generateSitemap = async () => {
    try {
        const jobs = await execute("select * from vw_jobs order by id desc", []);
        const baseUrl = 'https://jobgram.org';
        const staticUrls = [`${baseUrl}/`, `${baseUrl}/channels`];

        let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        staticUrls.forEach((url) => {
            sitemapXml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${format(new Date(), 'yyyy-MM-dd')}</lastmod>\n  </url>\n`;
        });

        jobs.forEach((job) => {
            const country = encodeURIComponent(job?.country || '');
            const city = encodeURIComponent(job?.city || '');
            const jobName = encodeURIComponent(job.job_name || '');
            const companyName = encodeURIComponent(job.company_name || '');
            const keywords = job.search_keywords || [];

            const dynamicUrls = [
                `${baseUrl}/?title=${jobName}&amp;location=${country}`,
                `${baseUrl}/?title=${jobName}&amp;location=${city}`,
                `${baseUrl}/?title=${companyName}&amp;location=${country}`,
                `${baseUrl}/?title=${companyName}&amp;location=${city}`,
                `${baseUrl}/job/${job._id}?job_name=${jobName}&amp;company_name=${companyName}`
            ];

            keywords.forEach((keyword) => {
                const encodedKeyword = encodeURIComponent(keyword);
                dynamicUrls.push(`${baseUrl}/?title=${encodedKeyword}&amp;location=${country}`);
                dynamicUrls.push(`${baseUrl}/?title=${encodedKeyword}&amp;location=${city}`);
            });

            const lastModifiedDate = job.updatedAt ? format(new Date(job.updatedAt), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');

            dynamicUrls.forEach((url) => {
                sitemapXml += `<url>\n    <loc>${url}</loc>\n    <lastmod>${lastModifiedDate}</lastmod>\n  </url>\n`;
            });
        });

        sitemapXml += '</urlset>';
        fs.writeFileSync(path.join(__dirname, "../../web/public/sitemap.xml"), sitemapXml);
        console.log('Sitemap generated successfully!');
    } catch (err) {
        console.error('Error generating sitemap:', err.message);
    }
}

generateSitemap();

cron.schedule('0 0 * * *', () => {
    console.log('Generating sitemap...');
    generateSitemap();
});