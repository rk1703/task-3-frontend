import Head from 'next/head';

import ShowProduct from './src/showProduct'

export default function Home({products}) {
  
  return (
  <>
    
    <ShowProduct products={products}/>
  </>
  )
}

export async function getServerSideProps() {
  const response = await fetch(
    "https://task-3-backend.herokuapp.com/api/products/fetchallproducts",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return { props: {products: data}};
}
