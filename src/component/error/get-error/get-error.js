/*eslint-disable*/
import React from 'react';
import rick from './icons8-рик-санчес (1).svg';
import './get-error.css';

const GetPostsError = () => {
  let errorText =
    "<<Well, well, Morty, looks like we've hit a little snag. The system's as useful as a sieve in a swimming pool. Maybe it's time to call it quits and let the universe implode. After all, who needs functioning software when you've got infinite despair, am I right?>>";
  return (
    <div className="rick-error">
      <img src={rick} alt="rick" className="rick-error_image" />
      <div className="rick-error_description">
        <h2 className="rick-error_title">Error!</h2>
        <p className="rick-error_text">{errorText}</p>
      </div>
    </div>
  );
};

export default GetPostsError;
/*eslint-enable*/
