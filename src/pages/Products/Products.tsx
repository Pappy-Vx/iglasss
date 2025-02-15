import { useParams } from 'react-router-dom';
import Header from "../../components/Header";
import ProductDetails from './layout/ProductDetails';
import all_product from '../../assets/items/all_product';
import ProductCard from '../Home/layout/ProductCard';
import RecentlyViewed from '../Home/layout/RecentlyViewed';
import Footer from '../../components/Footer';

const Products = () => {
  const { id } = useParams();
  
  // If we have an ID, show the product details
  if (id) {
    return (
      <>
        <Header />
        <ProductDetails />
        <RecentlyViewed />
      </>
    );
  }

  // Otherwise, show the product listing
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
          <p className="text-gray-600 mt-2">Discover our collection of premium products</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {all_product.map((product) => (
            <ProductCard
              key={product.id}
              id={String(product.id)}
              name={product.name}
              price={product.new_price}
              originalPrice={product.old_price}
              imageUrl={product.image}
              rating={4.5}
              reviews={Math.floor(Math.random() * 200) + 50}
              discount={Math.floor(((product.old_price - product.new_price) / product.old_price) * 100)}
            />
          ))}
        </div>
        <RecentlyViewed />
      </div>
      <Footer />
    </>
  );
};

export default Products;
