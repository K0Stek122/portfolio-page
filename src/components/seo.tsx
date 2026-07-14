import signatureImage from '../assets/signature.png';

const SITE_URL = 'https://kostek.uk';
const SITE_NAME = 'Kamil Kostrzewa';
const DEFAULT_IMAGE = `${SITE_URL}${signatureImage}`;

interface SEOProps {
    title: string;
    description: string;
    path: string;
    type?: 'website' | 'article';
}

export default function SEO({ title, description, path, type = 'website' }: SEOProps) {
    const url = `${SITE_URL}${path}`;

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={DEFAULT_IMAGE} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={DEFAULT_IMAGE} />
        </>
    );
}
