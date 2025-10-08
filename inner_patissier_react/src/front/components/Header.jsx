import React from "react";

const Header = ({ primary, secondary }) => {
  return (
    <div className="mb-12 mx-auto text-center relative">
      {/* Primary subtitle */}
      <p className="text-3xl font-bold md:text-5xl text-[rgba(128,0,32,100%)] dark:text-gray-400 mb-2">
        {primary}
      </p>

      {/* Secondary main title */}
      <h2 className="text-lg md:text-2xl font-semibold tracking-tight text-[rgba(128,0,32,44%)] dark:text-gray-100 relative inline-block">
        {secondary}

        {/* Curved SVG underline */}


      </h2>
      <svg className="w-36 h-5 mx-auto fill-" viewBox="0 0 148 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Ellipse 15" d="M0.245764 11.3274C4.27312 7.44954 12.0331 4.44031 22.7889 2.58537C33.5448 0.730425 46.9397 0.0913274 61.7019 0.728746C76.4642 1.36616 92.104 3.25895 107.137 6.22741C122.169 9.19587 136.096 13.1415 147.594 17.6897L137.684 19.6844C128.081 15.8858 116.45 12.5905 103.895 10.1113C91.3403 7.63212 78.2783 6.05132 65.9492 5.51896C53.6201 4.9866 42.433 5.52036 33.45 7.06957C24.4669 8.61877 17.986 11.132 14.6225 14.3707L0.245764 11.3274Z" fill="#800020" fill-opacity="0.58"/>
      </svg>

    </div>
  );
};

export default Header;
