import React from "react";
import { Helmet } from "react-helmet";
import LoginForm from "./components/LoginForm";
import TrustSignals from "./components/TrustSignals";
import SupportInfo from "./components/SupportInfo";
import LoginHeader from "./components/LoginHeader";
import LoginFooter from "./components/LoginFooter";

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Sign In - Invest Wise</title>
        <meta
          name="description"
          content="Secure login to your institutional portfolio management dashboard. Access comprehensive analytics, risk management tools, and automated reporting."
        />
      </Helmet>

      <div className="min-h-screen bg-grey text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2247%22%20cy%3D%227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%227%22%20cy%3D%2227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2227%22%20cy%3D%2227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2247%22%20cy%3D%2227%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%227%22%20cy%3D%2247%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2227%22%20cy%3D%2247%22%20r%3D%221%22/%3E%3Ccircle%20cx%3D%2247%22%20cy%3D%2247%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-success/5 rounded-full blur-xl"></div>

        {/* Header */}
        <LoginHeader />

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12 bg-black">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Branding & Info */}
              <div className="text-center lg:text-left space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    Institutional Portfolio
                    <span className="block text-blue-300">Management</span>
                  </h2>
                  <p className="text-xl text-blue-100 mb-6">
                    Advanced analytics and risk management tools for
                    professional portfolio managers and financial analysts.
                  </p>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 3V21H21"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7 16L12 11L16 15L21 10"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-white">
                        Real-time Analytics
                      </h3>
                    </div>
                    <p className="text-sm text-blue-100">
                      Live portfolio performance tracking and risk metrics
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 12L11 14L15 10"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-white">
                        Automated Reports
                      </h3>
                    </div>
                    <p className="text-sm text-blue-100">
                      Professional client reporting and compliance tools
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 1L3 5L12 9L21 5L12 1Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 17L12 21L21 17"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 12L12 16L21 12"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-white">
                        Risk Management
                      </h3>
                    </div>
                    <p className="text-sm text-blue-100">
                      Advanced VaR calculations and stress testing
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                            stroke="white"
                            strokeWidth="2"
                          />
                          <line
                            x1="16"
                            y1="2"
                            x2="16"
                            y2="6"
                            stroke="white"
                            strokeWidth="2"
                          />
                          <line
                            x1="8"
                            y1="2"
                            x2="8"
                            y2="6"
                            stroke="white"
                            strokeWidth="2"
                          />
                          <line
                            x1="3"
                            y1="10"
                            x2="21"
                            y2="10"
                            stroke="white"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-white">
                        Multi-Portfolio
                      </h3>
                    </div>
                    <p className="text-sm text-blue-100">
                      Manage multiple portfolios with unified dashboard
                    </p>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="hidden lg:block">
                  <TrustSignals />
                </div>
              </div>

              {/* Right Column - Login Form */}
              <div className="flex flex-col space-y-8">
                <LoginForm />

                {/* Support Information */}
                <SupportInfo />
              </div>
            </div>

            {/* Mobile Trust Signals */}
            <div className="lg:hidden mt-12">
              <TrustSignals />
            </div>
          </div>
        </main>

        {/* Footer */}
        <LoginFooter />
      </div>
    </>
  );
};

export default Login;
