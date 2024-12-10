import React from 'react';
import Manufacturing from '../assets/IMG-20241124-WA0014.jpg';
import Laboratory from '../assets/IMG-20241124-WA0001.jpg';
import Water from '../assets/IMG-20241124-WA0006.jpg';

const facilities = [
  {
    image: Manufacturing,
    title: "Manufacturing Plant",
    description: "State-of-the-art manufacturing facility spanning 10,000 m²"
  },
  {
    image: Laboratory,
    title: "R&D Laboratory",
    description: "Advanced research and development center"
  },
  {
    image: Water,
    title: "Water Treatment Plant",
    description: "A modern facility designed to purify water using advanced filtration, chemical treatments, and disinfection processes to ensure safe and clean water for consumption."
  }
];

export default function FacilityShowcase() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our World-Class Facilities
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Equipped with cutting-edge technology to deliver excellence
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <div key={facility.title} className="overflow-hidden rounded-lg bg-gray-100">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className={`h-full w-full object-cover ${facility.title === "Quality Control" ? "max-h-48" : ""}`}
                />
              </div>
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">{facility.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
