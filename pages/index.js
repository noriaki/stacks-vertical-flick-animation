import React from 'react';
import PropTypes from 'prop-types';
import MobileDetect from 'mobile-detect';
import Head from 'next/head';

import {
  version as appVersion,
  description as appDescription,
  title as appTitle,
} from '../package.json';

// components
import Stack from '../components/Stack';

const stack = [1, 2, 3, 4, 5];

const IndexPage = ({ isMobile }) => (
  <main>
    <Head>
      <meta charSet="utf-8" />
      <title>{appTitle} /v{appVersion}</title>
      <meta name="description" content={appDescription} />
    </Head>
    <article>
      <Stack stack={stack} isMobile={isMobile} />
    </article>
  </main>
);
IndexPage.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};
IndexPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  const baseURI = req ? fqdn(req.headers) : fqdn(document.location);
  const os = (new MobileDetect(userAgent)).os();
  const isMobile = ['AndroidOS', 'iOS'].includes(os);
  return ({
    userAgent,
    baseURI,
    os,
    isMobile,
  });
};

export default IndexPage;

const fqdn = ({ protocol = 'https:', host }) => `${protocol}//${host}`;
