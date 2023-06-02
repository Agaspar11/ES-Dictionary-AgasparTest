import React, { useState } from 'react';
import './Menu.css';

export default function ProgressBar({progress,searchCount,saveprogress,saveCount}){

  return (
    <>
    <div className='progress-maincontainer'>
        <div className='progress-box'>
        <h3>Search Word</h3>
    <div className="progress-container" >
      <div
        className="progress-bar"
        style={{
          background: `conic-gradient(blue ${progress}deg, transparent ${progress}deg)`,
        }}
      >  </div>
      <div className="search-count">{searchCount}</div>
      
    </div>
    </div>
    <div className='progress-box'>
    <h3>Save Word</h3>
    <div className="progress-container2" >
      <div
        className="progress-bar2"
        style={{
          background: `conic-gradient(blue ${saveprogress}deg, transparent ${saveprogress}deg)`,
        }}
      >  </div>
      <div className="search-count">{saveCount}</div>
    </div>
    </div>
    </div>
    </>
  );
};
