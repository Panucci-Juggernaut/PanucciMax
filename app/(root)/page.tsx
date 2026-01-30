import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";

const Homepage = () => {
  return (
    <div className='space-y-8'>
      <h2 className='h2-bold'>Latest Products</h2>
      <ProductList title='Newest Arrivals' data={sampleData.products} />
    </div>
  );
}
 
export default Homepage;