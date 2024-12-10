import React from 'react';

const stats = [
  { id: 1, name: 'Manufacturing Capacity', value: '8 KT', description: 'Monthly production capacity' },
  { id: 2, name: 'Facility Size', value: '10,000 m²', description: 'State-of-the-art facilities' },
  { id: 3, name: 'Annual Revenue', value: '25M+ EGP', description: 'In CY23, projected to double in CY24' },
  { id: 4, name: 'Industry Partners', value: '10+', description: 'Global industry leaders' },
];

export default function Stats() {
  return (
    <div className="bg-blue-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Our commitment to excellence reflects in our numbers
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-300">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-sm text-gray-300">{stat.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}