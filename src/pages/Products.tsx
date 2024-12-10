import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Factory, Leaf, FlaskConical as Flask } from 'lucide-react';
import { cn } from '../lib/utils';
import prouduct from '../components/assets/IMG-20241124-WA0014.jpg';

const productCategories = {
  industrial: [
    {
      id: 'ind-1',
      name: 'Industrial Solvents',
      description: 'High-performance solvents for industrial applications',
      image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80',
      category: 'industrial',
    },
    {
      id: 'ind-2',
      name: 'Process Chemicals',
      description: 'Essential chemicals for manufacturing processes',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80',
      category: 'industrial',
    },
  ],
  agricultural: [
    {
      id: 'agr-1',
      name: 'Crop Protection',
      description: 'Advanced solutions for crop health and protection',
      image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c8b8b?auto=format&fit=crop&q=80',
      category: 'agricultural',
    },
    {
      id: 'agr-2',
      name: 'Soil Enhancement',
      description: 'Products for soil fertility and health',
      image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c8b8b?auto=format&fit=crop&q=80',
      category: 'agricultural',
    },
  ],
  specialty: [
    {
      id: 'spc-1',
      name: 'Custom Synthesis',
      description: 'Tailored chemical synthesis services',
      image: 'https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&q=80',
      category: 'specialty',
    },
    {
      id: 'spc-2',
      name: 'Research Chemicals',
      description: 'High-purity compounds for research',
      image: 'https://images.unsplash.com/photo-1532187748412-3f2a5402b766?auto=format&fit=crop&q=80',
      category: 'specialty',
    },
  ],
};

const allProducts = [
  ...productCategories.industrial,
  ...productCategories.agricultural,
  ...productCategories.specialty,
];

export default function Products() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === activeCategory);

  const categories = [
    { id: 'all', name: t('products.categories.all'), icon: null },
    { id: 'industrial', name: t('products.categories.industrial'), icon: Factory },
    { id: 'agricultural', name: t('products.categories.agricultural'), icon: Leaf },
    { id: 'specialty', name: t('products.categories.specialty'), icon: Flask },
  ];

  return (
    <div className="bg-white">
      <div className="relative bg-blue-900 py-32">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-20"
            src={prouduct}
            alt="Products background"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('products.categories.title')}
          </h1>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                )}
              >
                {category.icon && <category.icon className="h-5 w-5 mr-2" />}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="group relative">
      <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">
          <Link to={`/products/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-gray-500">{product.description}</p>
      </div>
    </div>
  );
}