import Script from "next/script";

const GoogleAnalytics = () => {
    return (
        <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.measurement_id}`} />
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.measurement_id}');`}
            </Script>
        </>
    );
};

export default GoogleAnalytics;
