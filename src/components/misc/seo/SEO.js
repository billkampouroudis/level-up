import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
  APP_NAME,
  DEFAULT_PAGE_TITLE,
  DEFAULT_PAGE_DESCRIPTION
} from '../../../constants';

// images
// import favicon from '';

export default function Seo({ title, description, keywords, structuredData }) {
  const defaultTitle = DEFAULT_PAGE_TITLE;
  const defaultDescription = DEFAULT_PAGE_DESCRIPTION;
  const defaultKeywords = '';

  const formattedTitle = title ? `${title} • ${APP_NAME}` : defaultTitle;

  return (
    <Helmet>
      <html lang="en" />
      {/* <link rel="icon" type="image/png" href={favicon} /> */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=0"
      />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <title>{formattedTitle}</title>
      {structuredData ? (
        <script type="application/ld+json">{`{ ${structuredData} }`}</script>
      ) : (
        ''
      )}

      <meta itemProp="name" content="Gaudium" />
    </Helmet>
  );
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  structuredData: PropTypes.string
};
