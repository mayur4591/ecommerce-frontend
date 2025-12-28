import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCarosel from "../../components/HomeCarosel/MainCarosel";
import { fetchAllProducts } from "../../../State/Product/Action";

// Check this path carefully! Adjust based on your actual folder structure
import HomeSectionCard from "../../components/HomeSectionCard/HomeSectionCard"; 

const HomePage = () => {
  const dispatch = useDispatch();
  const productData = useSelector((store) => store.products || store.product);
  const products = productData?.products?.content || [];
  const loading = productData?.loading;

  useEffect(() => {
    dispatch(fetchAllProducts(0, 50));
  }, [dispatch]);

  if (loading) return <div className="h-screen flex justify-center items-center">Loading...</div>;

  return (
    <div>
      <MainCarosel />

      <div className="py-10 px-5 lg:px-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-10 text-center">Our Collection</h1>

        {/* The Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6 justify-items-center">
          {products.length > 0 ? (
            products.map((item) => (
              <HomeSectionCard key={item.id} product={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-xl">No products available to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;