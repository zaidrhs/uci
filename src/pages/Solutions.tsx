import React from 'react';
import { Beaker, TestTubes, Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import lab from '../components/assets/IMG-20241124-WA0003.jpg';

const solutions = [
  {
    name: 'Industrial Processing',
    description: 'Optimize your industrial processes with our cutting-edge chemical solutions.',
    icon: Beaker,
  },
  {
    name: 'Research & Development',
    description: 'Advanced compounds and materials for groundbreaking research.',
    icon: TestTubes,
  },
  {
    name: 'Sustainable Manufacturing',
    description: 'Green chemistry solutions for environmentally conscious production.',
    icon: Leaf,
  },
];

// Rest of the Solutions component remains the same
export default function Solutions() {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Chemical Solutions for Every Challenge
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  We provide innovative chemical solutions tailored to your specific needs, helping you overcome challenges and achieve your goals.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    to="/contact"
                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Discuss Your Needs
                  </Link>
                  <Link to="/products" className="text-sm font-semibold leading-6 text-gray-900">
                    View Products <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 md:-mr-20 lg:-mr-36" />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-blue-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-blue-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <img
                      src={lab}
                      alt="Lab solutions"
                      className="w-full rounded-xl shadow-xl ring-1 ring-white/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Advanced Solutions</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive range of chemical solutions is designed to meet the diverse needs of modern industries.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {solutions.map((solution) => (
              <div key={solution.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <solution.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {solution.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{solution.description}</p>
                  <p className="mt-6">
                    <Link to="#" className="text-sm font-semibold leading-6 text-blue-600">
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}