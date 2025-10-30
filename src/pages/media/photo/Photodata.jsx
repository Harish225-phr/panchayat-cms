import React from 'react';
import './Photodata.css';

function Photodata({ imageUrl, heading, paragraph }) {
  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card h-100 shadow photo-card">
        <img
          src={imageUrl}
          alt={heading}
          className="card-img-top"
        />
        <div className="card-body">
          <h6 className="card-title fw-bold">{heading}</h6>
          <p className="card-text text-muted">{paragraph}</p>
        </div>
      </div>
    </div>
  );
}

export default Photodata;
