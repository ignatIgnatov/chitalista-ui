import React from 'react';
import SeoHead from './SeoHead';

const ArticleSeo = ({ article }) => {
  if (!article) return null;

  const seoConfig = {
    title: `${article.title} | Народни читалища`,
    description: article.content.substring(0, 160) + '...',
    image: article.images && article.images[0] ? article.images[0].imageUrl : null,
    type: 'article',
    url: `${window.location.origin}/articles/${article.id}`
  };

  // Структурирани данни за JSON-LD
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.content.substring(0, 160),
    image: seoConfig.image ? [seoConfig.image] : [],
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Народни читалища'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Народни читалища',
      logo: {
        '@type': 'ImageObject',
        url: `${window.location.origin}/logo.png`
      }
    }
  };

  return (
    <>
      <SeoHead {...seoConfig} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </>
  );
};

export default ArticleSeo;