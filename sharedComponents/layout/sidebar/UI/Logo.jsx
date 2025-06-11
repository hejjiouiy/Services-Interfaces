const Logo = ({ isMobile, onClose }) => (
  <div className="flex items-center mb-6 w-full">
    <div className="flex items-center w-full">
      <h1 className="flex mt-12">
        <span className="text-2xl items-center mr-2 sm:text-3xl flex text-center justify-center my-auto h-8 w-8 sm:h-10 sm:w-10 font-bold text-main-beige bg-main-green rounded-sm">
          S
        </span>
        <span className="text-2xl items-center mr-2 sm:text-3xl flex text-center justify-center my-auto h-8 w-8 sm:h-10 sm:w-10 font-bold text-main-beige bg-main-green rounded-sm">
          H
        </span>
        <span className="text-2xl items-center mr-2 sm:text-3xl flex text-center justify-center my-auto h-8 w-8 sm:h-10 sm:w-10 font-bold text-main-beige bg-main-green rounded-sm">
          C
        </span>
        <span className="text-2xl items-center sm:text-3xl flex text-center justify-center my-auto h-8 w-8 sm:h-10 sm:w-10 font-bold text-main-beige bg-main-green rounded-sm">
          C
        </span>
      </h1>
    </div>

    {isMobile && (
      <button
        onClick={onClose}
        className="ml-auto p-1 hover:bg-main-green hover:text-main-beige rounded transition-colors duration-200"
        aria-label="Close menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg>
      </button>
    )}
  </div>
);

export default Logo;