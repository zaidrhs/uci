import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import ExperienceFields from '../components/home/ExperienceFields';
import FacilityShowcase from '../components/home/FacilityShowcase';
import ChemistryExperience from '../components/home/ChemistryExperience';
import { Eye, Target, TestTubes, Leaf, Beaker } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* About Us Section */}
      <div className="relative py-24 bg-gray-50">
        <div  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div  className="lg:text-center">
            <h2 id='About' className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
              About UCI
            </h2>
            <div className="mt-6 space-y-6 text-lg text-gray-600">
              <p>
                UCI (Uni-Chem Industries for Specialty Chemicals) is a leading Egyptian manufacturer
                of specialty chemicals and auxiliaries, established in 2020. With state-of-the-art
                manufacturing facilities spanning 10,000 m², UCI is implementing a strategic
                three-phase expansion plan, with phase one successfully completed in February 2023.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Business Growth</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>• Sales exceeded 25 million EGP in CY23</li>
                    <li>• Projected to double by CY24</li>
                    <li>• Strategic partnerships with industry leaders</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Quality Commitment</h3>
                  <p className="text-gray-700">
                    Pursuing certification in ISO 9001, 14001, 18001, and 17025 by April 2024,
                    demonstrating our commitment to quality, environmental responsibility, and
                    technical excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Stats />
      
      <ChemistryExperience />
      
      <FacilityShowcase />

      <ExperienceFields />

      {/* Vision & Mission Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="bg-gray-50 rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <Eye className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                To be a leading global provider of high-quality chemical raw materials, recognized for our commitment to sustainability, innovation, and excellence in serving industries worldwide.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                At UniChem Chemical Industries, we aim to provide the highest quality raw materials to chemical manufacturers, helping them achieve their production goals through reliable, sustainable, and cost-effective solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Leading the Chemical Industry
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our commitment to innovation and sustainability drives everything we do.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {[
                {
                  title: 'Innovative Solutions',
                  description: 'Cutting-edge chemical products designed for modern industry needs.',
                  icon: TestTubes,
                },
                {
                  title: 'Sustainable Practices',
                  description: 'Environmentally conscious processes and green chemistry initiatives.',
                  icon: Leaf,
                },
                {
                  title: 'Research Excellence',
                  description: 'Continuous investment in R&D to develop breakthrough solutions.',
                  icon: Beaker,
                },
              ].map((feature) => (
                <div key={feature.title} className="relative bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <div>
                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                      {feature.title}
                    </p>
                  </div>
                  <div className="mt-2 ml-16 text-base text-gray-500">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}