import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import facilityImage from '../assets/IMG-20241124-WA0014.jpg';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-blue-900 to-blue-800 py-32">
      <div className="absolute inset-0">
        <img
          src={facilityImage}
          alt="UCI Manufacturing Facility"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent mix-blend-multiply" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Leading Chemical Solutions for Tomorrow's Innovations
          </h1>
          <p className="mt-6 max-w-xl text-xl text-gray-300">
            UCI delivers cutting-edge chemical solutions that drive industry advancement while maintaining the highest standards of quality and sustainability.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              to="/contact"
              className="rounded-md bg-blue-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Get Started
            </Link>
            <Link
              to="/products"
              className="flex items-center text-base font-semibold text-white hover:text-gray-300"
            >
              View Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}