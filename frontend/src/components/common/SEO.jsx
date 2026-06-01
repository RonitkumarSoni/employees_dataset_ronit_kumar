import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, ogTitle, ogDescription, ogImage, schemaMarkup }) => {
  const defaultTitle = 'Employee Management Analytics';
  const defaultDesc = 'Premium administrative employee analytics dashboard with real-time CRUD and advanced reporting.';
  
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const pageDesc = description || defaultDesc;
  
  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph Tags (SEO & Social Previews) */}
      <meta property="og:title" content={ogTitle || pageTitle} />
      <meta property="og:description" content={ogDescription || pageDesc} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || pageTitle} />
      <meta name="twitter:description" content={ogDescription || pageDesc} />

      {/* Structured Schema.org Data (Mandatory requirement) */}
      {schemaMarkup ? (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      ) : (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'Employee Management Analytics System',
            'description': defaultDesc,
            'applicationCategory': 'BusinessApplication',
            'operatingSystem': 'All',
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
