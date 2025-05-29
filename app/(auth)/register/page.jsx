'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SignaturePad from './signaturePad';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Animation for decorative circles
  const [animateCircles, setAnimateCircles] = useState(false);

  // Trigger animation on component mount
  React.useEffect(() => {
    setAnimateCircles(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    // Password strength validation (basic example)
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Simulate registration request
    try {
      setIsLoading(true);

      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real application, you would call your API here
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error('Registration failed');
      // const data = await response.json();

      // Redirect after successful registration
      router.push('/login?registered=true');
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Image and overlay with text */}
      <div className="bg-main-green md:w-1/2 flex items-center justify-center relative overflow-hidden p-10 md:p-0">
        {/* Decorative circles */}
        <div className={`absolute w-96 h-96 rounded-full bg-green-400/20 -top-10 -left-10 transition-all duration-1000 ease-out ${animateCircles ? 'opacity-70 scale-110' : 'opacity-0 scale-100'}`}></div>
        <div className={`absolute w-72 h-72 rounded-full bg-green-400/10 bottom-10 right-10 transition-all duration-1000 delay-300 ease-out ${animateCircles ? 'opacity-70 scale-110' : 'opacity-0 scale-100'}`}></div>
        
        <div className="z-10 text-white text-center p-6 md:p-12">
          <div className="w-60 h-60 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-8">
            <img src="/images/img2.png" alt="Logo SHCC" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">SHCC Portal</h1>
          <p className="text-lg md:text-xl mb-8">Access all SHCC resources and services in one place.</p>
          <p className="text-sm md:text-base opacity-80">© 2024 SHCC. All rights reserved.</p>
        </div>
      </div>

      {/* Right side: Registration form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Join us to access all our services</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green focus:border-main-green"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green focus:border-main-green"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green focus:border-main-green"
                placeholder="example@shcc.ma"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green focus:border-main-green"
                placeholder="At least 8 characters"
                required
                minLength={8}
              />
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-green focus:border-main-green"
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="digitalSignature" className="block text-sm font-medium text-gray-700 mb-2">
                Digital Signature *
              </label>
              <SignaturePad />
            </div>

            <div className="flex items-start mb-8">
              <div className="flex items-center h-5">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-main-green border-gray-300 rounded focus:ring-main-green"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                  I agree to the <Link href="/terms" className="text-main-green hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-main-green hover:underline">Privacy Policy</Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-main-green text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-green transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-main-green hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center items-center gap-4">
              <button className="py-3 px-4 border border-gray-300 rounded-lg flex justify-center items-center hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335" />
                  <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0909 11.9998 19.0909C8.86633 19.0909 6.21896 17.0773 5.27682 14.2618L1.2373 17.3334C3.19263 21.2953 7.26484 24.0001 11.9998 24.0001C14.9327 24.0001 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853" />
                  <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2" />
                  <path d="M5.27698 14.2614C5.03833 13.5423 4.90909 12.7787 4.90909 11.9996C4.90909 11.2159 5.03444 10.4487 5.2662 9.76294L1.23999 6.64844C0.436587 8.25832 0 10.0778 0 11.9996C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2614Z" fill="#FBBC05" />
                </svg>
                Google
              </button>
              <button className="py-3 px-4 border border-gray-300 rounded-lg flex justify-center items-center hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.5 12.1093C22.5 6.53437 18.1875 2 12.75 2C7.3125 2 3 6.53437 3 12.1093C3 17.1406 6.375 21.3594 10.9688 22V15.0781H8.53125V12.1093H10.9688V9.84375C10.9688 7.25 12.5625 5.71875 14.8906 5.71875C16.0312 5.71875 17.1719 5.95312 17.1719 5.95312V8.39063H15.9375C14.7031 8.39063 14.2344 9.17188 14.2344 9.9531V12.1093H17.0781L16.6094 15.0781H14.2344V22C18.8281 21.3594 22.5 17.1406 22.5 12.1093Z" fill="#1877F2" />
                </svg>
                Facebook
              </button>
              <button className="py-3 px-4 border border-gray-300 rounded-lg flex justify-center items-center hover:bg-gray-50 transition-colors">
                <svg viewBox="0 0 32 32" className="h-6 w-6 mr-1" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"> 
                    <rect x="17" y="17" width="10" height="10" fill="#FEBA08"></rect> 
                    <rect x="5" y="17" width="10" height="10" fill="#05A6F0"></rect> 
                    <rect x="17" y="5" width="10" height="10" fill="#80BC06"></rect> 
                    <rect x="5" y="5" width="10" height="10" fill="#F25325"></rect> 
                  </g>
                </svg>
                Microsoft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;