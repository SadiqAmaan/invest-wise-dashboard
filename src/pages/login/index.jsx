import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import SupportInfo from './components/SupportInfo';

const Login = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Helmet>
        <title>Sign In - Invest Wise</title>
        <meta name="description" content="Secure login to your institutional portfolio management dashboard. Access comprehensive analytics, risk management tools, and automated reporting." />
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

        <header className="relative z-10 px-6 py-4 bg-slate-900">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3L21 21M3 21L21 3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">Invest Wise</h1>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">Contact</a>
            </nav>
          </div>
        </header>

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
                    Advanced analytics and risk management tools for professional portfolio managers and financial analysts.
                  </p>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 3V21H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M7 16L12 11L16 15L21 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="font-semibold text-white">Real-time Analytics</h3>
                    </div>
                    <p className="text-sm text-blue-100">Live portfolio performance tracking and risk metrics</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="font-semibold text-white">Automated Reports</h3>
                    </div>
                    <p className="text-sm text-blue-100">Professional client reporting and compliance tools</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1L3 5L12 9L21 5L12 1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 17L12 21L21 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 12L12 16L21 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="font-semibold text-white">Risk Management</h3>
                    </div>
                    <p className="text-sm text-blue-100">Advanced VaR calculations and stress testing</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="white" strokeWidth="2"/>
                          <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2"/>
                          <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2"/>
                          <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3 className="font-semibold text-white">Multi-Portfolio</h3>
                    </div>
                    <p className="text-sm text-blue-100">Manage multiple portfolios with unified dashboard</p>
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
        <footer className="relative z-10 px-6 py-8 border-t border-white/10 bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-sm text-blue-200">
                  © {currentYear} Invest Wise. All rights reserved.
                </p>
                <p className="text-xs text-blue-300 mt-1">
                  Trusted by 500+ institutional investors worldwide
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm text-green-300">System Status: Operational</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-blue-200 hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-blue-200 hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Login;