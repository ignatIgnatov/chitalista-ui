import React from 'react';
import { Helmet } from 'react-helmet-async';

const SeoHead = ({ 
  title = 'Народни читалища - Култура, традиции и съвременност',
  description = 'Открийте богатството на българската култура и традиции чрез народните читалища. Актуални статии, събития и новини.',
  keywords = 'народни читалища, българска култура, традиции, събития, статии',
  image = '/default-seo-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website'
}) => {
  const siteName = 'Народни читалища';

  return (
    <Helmet>
      {/* Основни мета тагове */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph мета тагове */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="bg_BG" />

      {/* Twitter Card мета тагове */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Допълнителни мета тагове */}
      <meta name="language" content="Bulgarian" />
      <meta name="author" content={siteName} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SeoHead;