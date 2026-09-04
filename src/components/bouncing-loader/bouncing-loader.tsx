import React from 'react';
import './bouncing-loader.scss';

const BouncingLoader = () => {
    return (
        <div className='bouncing-loader'>
            <div className='bouncing-loader__container'>
                <div className='bouncing-loader__ball bouncing-loader__ball--1'></div>
                <div className='bouncing-loader__ball bouncing-loader__ball--2'></div>
                <div className='bouncing-loader__ball bouncing-loader__ball--3'></div>
            </div>
            <p className='bouncing-loader__text'>Loading...</p>
        </div>
    );
};

export default BouncingLoader;
