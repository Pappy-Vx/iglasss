import { Link } from 'react-router-dom';
import { CategoryCardProps } from '../../../types/home.types';

const mockCategories: CategoryCardProps[] = [
  {
    id: '1',
    name: 'Surgical',
    imageUrl: 'https://via.placeholder.com/200',
    // itemCount: 156
  },
  {
    id: '2',
    name: 'Medical',
    imageUrl: 'https://via.placeholder.com/200',
    // itemCount: 284
  },
  {
    id: '3',
    name: 'Dental',
    imageUrl: 'https://via.placeholder.com/200',
    // itemCount: 192
  },
  {
    id: '4',
    name: 'Laboratory Equipment',
    imageUrl: 'https://via.placeholder.com/200',
    // itemCount: 192
  },
  {
    id: '5',
    name: 'Implants',
    imageUrl: 'https://via.placeholder.com/200',
    // itemCount: 192
  },
  // Add more categories
];

const Categories = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {mockCategories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.name.toLowerCase()}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    {category.name}
                  </h3>
                  {/* <span className="text-sm">
                    {category.itemCount} items
                  </span> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
