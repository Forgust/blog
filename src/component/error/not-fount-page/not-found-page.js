import React from 'react';
import { Link } from 'react-router-dom';
import notFound from './icons8-not-found-96.png';

import './not-found-page.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page_container">
        <h3 className="not-found-page_title">NOT FOUND PAGE</h3>
        <img className="not-found-page_image" alt="not found" src={notFound} />
        <q className="not-found-page_text">
          This page is MIA. Return to the{' '}
          <Link className="not-found-page_btn" to="/posts">
            main page
          </Link>{' '}
          and see what’s left of this dumpster fire of a site
        </q>
      </div>
    </div>
  );
};

export default NotFoundPage;
