import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  url, 
  type = 'website',
  author = 'SkyWeb Private Limited Technologies',
  publishedTime,
  modifiedTime
}) => {
  const siteUrl = 'https://skywebdev.xyz';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = ogImage || `${siteUrl}/logo512.png`;
  
  const defaultTitle = 'SkyWeb Private Limited - Professional Web Development & MERN Stack Solutions';
  const defaultDescription = 'SkyWeb Private Limited delivers cutting-edge web development, MERN stack applications, mobile apps, and custom software solutions. Transform your business with our expert team in Hyderabad.';
  const defaultKeywords = 'web development, MERN stack, React, Node.js, MongoDB, Express, mobile apps, custom software, Hyderabad, India';
  
  const seoTitle = title ? `${title} | SkyWeb Private Limited` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="SkyWeb Private Limited" />
      <meta property="og:locale" content="en_US" />
      
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@SkyWebTech" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
    </Helmet>
  );
};

export default SEO;

