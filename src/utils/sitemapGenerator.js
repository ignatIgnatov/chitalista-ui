export const generateSitemap = (articles, baseUrl = 'https://narodnichitalishta.bg') => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/articles`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    }
  ];

  // Добавяне на URLs за всяка статия
  articles.forEach(article => {
    urls.push({
      url: `${baseUrl}/articles/${article.id}`,
      lastmod: article.updatedAt.split('T')[0],
      changefreq: 'monthly',
      priority: '0.6'
    });
  });

  return urls;
};

export const generateSitemapXML = (articles, baseUrl) => {
  const urls = generateSitemap(articles, baseUrl);
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.url}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};