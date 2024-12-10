import React from 'react';
import { Hexagon, Droplet, Box, Paintbrush, Leaf, Layers, Briefcase, Scissors, Mic } from 'lucide-react';

const fields = [
  { name: 'Detergent', color: 'bg-blue-100 hover:bg-blue-200', icon: <Droplet className="h-6 w-6 mx-auto mb-2 text-gray-600 group-hover:text-gray-800" /> },
  { name: 'Coating', color: 'bg-green-100 hover:bg-green-200', icon: <Box className="h-6 w-6 mx-auto mb-2 text-gray-600 group-hover:text-gray-800" /> },
  { name: 'Ink Additives', color: 'bg-yellow-100 hover:bg-yellow-200', icon: <Paintbrush className="h-6 w-6 mx-auto mb-2 text-gray-600 group-hover:text-gray-800" /> },
  { name: 'Textile Auxiliaries', color: 'bg-purple-100 hover:bg-purple-200', icon: <Leaf className="h-6 w-6 mx-auto mb-2 text-gray-600 group-hover:text-gray-800" /> },
  { name: 'Ceramic Additives', color: 'bg-red-100 hover:bg-red-200', icon: <Mic className="h-6 w-6 mx-auto mb-2 text-gray-600 group-hover:text-gray-800" /> },
  { name: 'Paper Auxiliaries', color: 'bg-orange-100 hover:bg-orange-200', icon: <Layers className="h-6 w-6 mx-auto mb-2 text-gray-600 group-hover:text-gray-800" /> },
  { name: 'Carpets Auxiliaries', color: 'bg-teal-100 hover:bg-teal-200', icon: <Briefcase className="h-6 w-6 mx-auto mb-2 text-gray-600 group-hover:text-gray-800" /> },
  { name: 'Petroleum Additives', color: 'bg-indigo-100 hover:bg-indigo-200', icon: <Scissors className="h-6 w-6 mx-auto mb-2 text-gray-600 group-hover:text-gray-800" /> },
  { name: 'Cosmetics', color: 'bg-pink-100 hover:bg-pink-200', icon: <Droplet className="h-6 w-6 mx-auto mb-2 text-gray-600 group-hover:text-gray-800" /> },
  { name: 'Water Treatment', color: 'bg-cyan-100 hover:bg-cyan-200', icon: <Droplet className="h-6 w-6 mx-auto mb-2 text-gray-600 group-hover:text-gray-800" /> }
];

export default function ExperienceFields() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Current Fields of Experience
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Expertise across diverse chemical industries
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {fields.map((field, index) => (
            <div
              key={field.name}
              className={`relative group ${index % 2 === 0 ? 'md:translate-y-8' : ''}`}
            >
              <div className={`
                ${field.color}
                w-32 h-36
                flex items-center justify-center
                clip-hex
                transition-all duration-300
                cursor-pointer
                shadow-lg
                group-hover:shadow-xl
                group-hover:scale-105
              `}>
                <div className="text-center p-4">
                  {field.icon} {/* هنا يتم عرض الأيقونة الخاصة بكل حقل */}
                  <span className="text-sm font-medium text-gray-800">
                    {field.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
