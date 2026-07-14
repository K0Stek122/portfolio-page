import signatureImage from '../assets/signature.png';
import headshotImage from '../assets/LinkedIn_avif.avif';

const SITE_URL = 'https://kostek.uk';
const SITE_NAME = 'Kamil Kostrzewa';
const DEFAULT_IMAGE = `${SITE_URL}${signatureImage}`;

interface BreadcrumbEntry {
    name: string;
    path: string;
}

interface SEOProps {
    title: string;
    description: string;
    path: string;
    type?: 'website' | 'article';
    /** Renders a Person JSON-LD block. Only the homepage should set this. */
    includePerson?: boolean;
    /** Mirrors the visible <Breadcrumb> trail on the page, in order, starting with Home. */
    breadcrumbs?: BreadcrumbEntry[];
}

/** Guards against a stray "</script" inside JSON content from prematurely closing the tag. */
function toJsonLd(data: unknown): string {
    return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function SEO({ title, description, path, type = 'website', includePerson = false, breadcrumbs }: SEOProps) {
    const url = `${SITE_URL}${path}`;

    const personLd = includePerson ? {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: SITE_NAME,
        url,
        image: `${SITE_URL}${headshotImage}`,
        jobTitle: 'Software Engineer',
        sameAs: [
            'https://www.linkedin.com/in/kamil-kostek/',
            'https://github.com/K0Stek122',
        ],
    } : null;

    const breadcrumbLd = breadcrumbs?.length ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${SITE_URL}${crumb.path}`,
        })),
    } : null;

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
            {personLd && <script type="application/ld+json">{toJsonLd(personLd)}</script>}
            {breadcrumbLd && <script type="application/ld+json">{toJsonLd(breadcrumbLd)}</script>}
        </>
    );
}
