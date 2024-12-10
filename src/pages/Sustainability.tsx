import React from 'react';
import { Leaf, Recycle, TreePine, Wind } from 'lucide-react';
import imgSustainability from '../components/assets/IMG-20241124-WA0013.jpg';
const initiatives = [
  {
    name: 'Green Chemistry',
    description: 'Developing eco-friendly chemical processes and products',
    icon: Leaf,
  },
  {
    name: 'Circular Economy',
    description: 'Implementing closed-loop systems for resource optimization',
    icon: Recycle,
  },
  {
    name: 'Carbon Reduction',
    description: 'Working towards carbon neutrality in our operations',
    icon: Wind,
  },
  {
    name: 'Environmental Protection',
    description: 'Preserving biodiversity and natural resources',
    icon: TreePine,
  },
];

const metrics = [
  { id: 1, stat: '35%', emphasis: 'Carbon Reduction', rest: 'in manufacturing processes since 2020' },
  { id: 2, stat: '40+', emphasis: 'Green Products', rest: 'developed in the last year' },
  { id: 3, stat: '90%', emphasis: 'Waste Recycled', rest: 'across all our facilities' },
  { id: 4, stat: '100%', emphasis: 'Renewable Energy', rest: 'in our main production facilities' },
];

export default function Sustainability() {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-green-100/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              Our Commitment to Sustainability
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                We are dedicated to developing sustainable solutions that protect our environment and
                create value for society. Our commitment to sustainability drives innovation and shapes
                our business strategy.
              </p>
            </div>
            <img
              src={imgSustainability}
              alt="Sustainability"
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Sustainability Initiatives
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              We're taking concrete actions to create a more sustainable future.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">{metric.emphasis}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {metric.stat}
                </dd>
                <dd className="mt-1 text-sm text-gray-500">{metric.rest}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 bg-green-50">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {initiatives.map((initiative) => (
              <div
                key={initiative.name}
                className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:border-gray-400"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                    <initiative.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{initiative.name}</p>
                    <p className="truncate text-sm text-gray-500">{initiative.description}</p>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}