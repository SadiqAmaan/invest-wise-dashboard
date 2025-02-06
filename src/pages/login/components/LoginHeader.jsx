import React from "react";

const LoginHeader = () => {
  return (
    <header className="relative z-10 px-6 py-4 bg-slate-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3L21 21M3 21L21 3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Invest Wise</h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-sm text-blue-200 hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-blue-200 hover:text-white transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-blue-200 hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default LoginHeader;
