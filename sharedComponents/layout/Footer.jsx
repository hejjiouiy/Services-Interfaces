import React from 'react';

const Footer = () => {
    return (
        <footer className="grid grid-cols-4 pt-14 gap-4 w-full bg-main-green text-main-beige p-4 mt-10 relative z-20">
            <div className="">
                <img src="/images/logo.png" alt="Logo" className="" />
            </div>
            <div className="">
                <h2 className="text-secondary-green font-bold">
                    Information
                </h2>
                <ul className="flex flex-col space-y-4 mt-5 mx-1">
                    <li className="hover:text-secondary-green duration-300 ease-in-out"><a href="/">Smart Healthcare City</a></li>
                    <li className="hover:text-secondary-green duration-300 ease-in-out"><a href="/">faculty of medical science</a></li>
                    <li className="hover:text-secondary-green duration-300 ease-in-out"><a href="/">UM6P Hospitals</a></li>
                    <li className="hover:text-secondary-green duration-300 ease-in-out"><a href="/">ISSB Institute</a></li>
                    <li className="hover:text-secondary-green duration-300 ease-in-out"><a href="/">Biotech park</a></li>
                </ul>
                
            </div>
            <div className="">
                <h2 className="text-secondary-green font-bold">
                    Contact
                </h2>
                <ul className="flex flex-col space-y-4 mt-5 mx-1">
                    <li className="hover:text-secondary-green duration-300 ease-in-out">Lot 660, Hay Moulay Rachid 
                    <br/>Ben Guerir, 43150, Morocco</li>
                    <li className="hover:text-secondary-green duration-300 ease-in-out"><a href="/"> +212 525 073 100</a></li>
                    <li className="hover:text-secondary-green duration-300 ease-in-out"><a href="/">contact@um6p.ma</a></li>
                </ul>
                
            </div>
            <div className="">
            <h2 className="text-secondary-green font-bold">
                    Follow us
                </h2>
                <ul className="flex flex-row space-x-2 mt-5 mx-1">
                    <li className="hover:text-secondary-green duration-300 ease-in-out"><a href="/"> 
                    <svg 
                        className="w-7 h-7 mr-2"
                        viewBox="-5 0 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff"
                    >
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-385.000000, -7399.000000)" fill="#ffffff">
                            <g transform="translate(56.000000, 160.000000)">
                            <path d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z">
                            </path>
                            </g>
                        </g>
                        </g>
                    </svg>
                    </a></li>
                    <li className="hover:text-secondary-green duration-300 ease-in ease-out">
                    <a>
                    <svg 
                        className="w-8 h-8 mr-2"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke=""
                    >
                        <g>
                        <path d="M0,0h48v48H0V0z" fill="none" />
                        <path d="M36,4H12c-4.4,0-8,3.6-8,8v24c0,4.4,3.6,8,8,8h24c4.4,0,8-3.6,8-8V12C44,7.6,40.4,4,36,4z M24,34c-5.5,0-10-4.5-10-10 s4.5-10,10-10s10,4.5,10,10S29.5,34,24,34z M35,15c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C37,14.1,36.1,15,35,15z" fill="#ffffff" />
                        </g>
                    </svg>
                    </a>    
                    </li>
                    
                    <li className="hover:text-secondary-green duration-300 ease-in ease-out"><a href="/">
                    <svg 
                        className="w-8 h-8 mr-2"
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" fill="#ffffff" />
                        <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" fill="#ffffff" />
                        <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" fill="#ffffff" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="#ffffff" />
                    </svg>
                    </a></li>
                    <li className="hover:text-secondary-green duration-300 ease-in ease-out"><a href="/">
                    <svg 
                        className="w-8 h-8 mr-2"
                        viewBox="0 -3 20 20" 
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff"
                    >
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-300.000000, -7442.000000)" fill="#ffffff">
                            <g transform="translate(56.000000, 160.000000)">
                            <path d="M251.988432,7291.58588 L251.988432,7285.97425 C253.980638,7286.91168 255.523602,7287.8172 257.348463,7288.79353 C255.843351,7289.62824 253.980638,7290.56468 251.988432,7291.58588 M263.090998,7283.18289 C262.747343,7282.73013 262.161634,7282.37809 261.538073,7282.26141 C259.705243,7281.91336 248.270974,7281.91237 246.439141,7282.26141 C245.939097,7282.35515 245.493839,7282.58153 245.111335,7282.93357 C243.49964,7284.42947 244.004664,7292.45151 244.393145,7293.75096 C244.556505,7294.31342 244.767679,7294.71931 245.033639,7294.98558 C245.376298,7295.33761 245.845463,7295.57995 246.384355,7295.68865 C247.893451,7296.0008 255.668037,7296.17532 261.506198,7295.73552 C262.044094,7295.64178 262.520231,7295.39147 262.895762,7295.02447 C264.385932,7293.53455 264.28433,7285.06174 263.090998,7283.18289">
                            </path>
                            </g>
                        </g>
                        </g>
                    </svg>
                    </a></li>

                </ul>
            </div>
        </footer>
    );
};


export default Footer;