export const injectStyles = (styles) => {
    if (typeof document !== 'undefined') {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);
    }
};