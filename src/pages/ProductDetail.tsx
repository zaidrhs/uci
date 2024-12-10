import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Shield, FlaskConical as Flask, Download } from 'lucide-react';

export default function ProductDetail() {
  const { productId } = useParams();
  const { t } = useTranslation();

  // In a real application, fetch product details based on productId
  const product = {
    name: 'Industrial Solvent X-100',
    description:
      'A high-performance industrial solvent designed for demanding applications in manufacturing and processing.',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80',
    features: [
      'High purity grade (99.9%)',
      'Low toxicity profile',
      'Rapid evaporation rate',
      'Compatible with most materials',
    ],
    applications: [
      'Metal cleaning and degreasing',
      'Paint and coating manufacturing',
      'Electronic component cleaning',
      'Industrial parts washing',
    ],
    specifications: {
      'Chemical Formula': 'C8H18O',
      'Boiling Point': '100°C',
      'Flash Point': '23°C',
      'Density': '0.89 g/cm³',
      'Purity': '≥99.9%',
    },
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Image */}
          <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Product Info */}
          <div className="mt-10 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-4">
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50">
                <FileText className="h-5 w-5 mr-2" />
                Safety Data Sheet
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-blue-600 rounded-md text-blue-600 hover:bg-blue-50">
                <Download className="h-5 w-5 mr-2" />
                Technical Data
              </button>
            </div>
          </div>
        </div>

        {/* Features and Applications */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <ul className="space-y-4">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications</h2>
            <ul className="space-y-4">
              {product.applications.map((application, index) => (
                <li key={index} className="flex items-start">
                  <Flask className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <span>{application}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}