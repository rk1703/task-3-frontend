import React,{useEffect,useState} from "react";
import Image from "next/image"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

import { FaStar } from "react-icons/fa";

const ShowProduct = ({products}) => {
  const [update, setUpdate] = useState(1)
  const [productsData,setProductsData] = useState([...products])
  const imgUrl = "http://res.cloudinary.com/dvwplxhm1/image/upload/v1655461802/"
  
  
  const deleteProduct = async (pid) => {
    const response = await fetch(
      `https://task-3-backend.herokuapp.com/api/products/deleteproduct/${pid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const deletedProduct = await response.json();
    if (response.status === 200) {
      setUpdate(update+1)
      toast.success(deletedProduct.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const fetchProduct = async ()=>{
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
    setProductsData(data)
  }

  

  useEffect(() => {
    fetchProduct();
  }, [update])
  

  const router = useRouter();

  return (
    <>
      <section className="text-gray-600 body-font"> 
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {productsData.map((e) => {
              let { title, discription, price, rating, image } = e;
              return (
                <div key={e._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <a className="block relative h-48 rounded overflow-hidden">
                    <Image
                      layout="fill"
                      alt="ecommerce"
                      className="object-contain relative w-full h-[unset]"
                      src={`${image?`${imgUrl}${image}`:"https://dummyimage.com/420x260"}`}
                    />
                  </a>
                  <div className="mt-4  flex flex-col justify-center items-center">
                    <div className="flex">
                      {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                          <label key={i}>
                            <input
                              type="radio"
                              name="rating"
                              className="hidden"
                              value={ratingValue}
                            />
                            <FaStar
                              size={20}
                              color={
                                ratingValue <= rating ? "#ffc107" : "#e4e5e9"
                              }
                            />
                          </label>
                        );
                      })}
                    </div>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {title}
                    </h2>
                    <p className="mt-1">{discription}</p>
                    <p className="mt-1">Price ₹{price}</p>
                  </div>
                  <div className="flex justify-evenly">
                    <button
                      className="text-xl text-center  font-semibold bg-blue-800 text-white rounded-3xl py-1 px-3"
                      onClick={() => router.push(`/src/${e._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xl text-center font-semibold bg-blue-800 text-white rounded-3xl py-1 px-3"
                      onClick={() => {
                        deleteProduct(e._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default ShowProduct;
