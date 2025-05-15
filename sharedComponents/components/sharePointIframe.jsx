'use client';
import React from 'react';
import PropTypes from 'prop-types';

const SharePointIframe = () => (
    <div className='flex flex-col items-center justify-center w-full h-full mt-8 max-w-7xl mx-auto px-4'>
        <div className='w-full text-center mb-6'>
            <h1 className='text-3xl font-bold text-main-green mb-3'>SharePoint</h1>
            <p className='text-darker-beige text-lg mb-4'>Access to SharePoint for more information</p>
        </div>
        <button 
            className='mb-6 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-main-beige bg-main-green hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105' 
            onClick={() => window.open("https://um6p.sharepoint.com/sites/FMS", "_blank")}
        >
            View Full SharePoint Site
        </button>
        <div className='w-full rounded-lg shadow-xl overflow-hidden'>
            <iframe
                src="https://cdx.transform.microsoft.com/"
                width="100%"
                height="600px"
                style={{ border: 'none' }}
                title="SharePoint Content"
                allowFullScreen
            />
        </div>
    </div>
);

SharePointIframe.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
};

SharePointIframe.defaultProps = {
    title: 'SharePoint Content',
    width: '100%',
    height: '600px',
    style: {},
};

export default SharePointIframe;