import React from 'react';
import { 
    FlaskConical as Flask, 
  Atom, 
  Combine, 
  Waves, 
  CircleDot, 
  Droplet, 
  Cylinder
} from 'lucide-react';

const processes = [
  {
    title: 'Polymerization Solutions',
    description: 'Expertise in both low and high molecular weight polymers using Chain Transfer technique',
    icon: Atom
  },
  {
    title: 'Esterification & Back Esterification',
    description: 'Advanced emulsion processes for chemical synthesis',
    icon: Combine
  },
  {
    title: 'Amide Formation Inverse',
    description: 'Specialized inverse formation techniques',
    icon: Flask
  },
  {
    title: 'Cyclic Ester',
    description: 'Including Dimer and AKD Precipitate processes',
    icon: CircleDot
  },
  {
    title: 'Plasticizers',
    description: 'Primary and Secondary Grafting techniques',
    icon: Waves
  },
  {
    title: 'Hydration & Hydrogenation',
    description: 'Comprehensive hydration and hydrogenation processes',
    icon: Droplet
  }
];

export default function ChemistryExperience() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <Cylinder className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Chemistry Experience - Manufacture Scale
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our extensive manufacturing capabilities span across multiple chemical processes,
            delivering high-quality solutions at scale.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {processes.map((process) => (
              <div 
                key={process.title}
                className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
              >
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                    <process.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {process.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{process.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We have established significant capabilities in polymer production, 
            successfully manufacturing both low and high molecular weight polymers 
            through advanced Chain Transfer techniques in Polymerization.
          </p>
        </div>
      </div>
    </div>
  );
}