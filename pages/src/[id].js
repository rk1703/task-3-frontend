import React, { useState,useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {useDropzone} from 'react-dropzone'

const updateProduct = ({product}) => {
  const [image ,setImage] = useState(null)
  const onDrop = useCallback((acceptedFiles)=>{
    const url = "https://api.cloudinary.com/v1_1/dvwplxhm1/upload"
    acceptedFiles.forEach(async(acceptedFile)=>{

      
      const formData = new FormData();
      formData.append('file',acceptedFile)
      formData.append('upload_preset','cwdtsx11')

      try {
      const response = await fetch(url,{
        method:'POST',
        body:formData
      });
        const data = await response.json();
        setImage(data.public_id)
      } catch (error) {
        console.log(error)
      }
    })
  },[]);

  const {getRootProps, getInputProps, isDragActive } = useDropzone({onDrop,accepts:"image/*",multiple:false})
    const id = product._id;
    const [uproduct, setUproduct] = useState({
        title: product.title,
        discription: product.discription,
        price: product.price,
        rating: product.rating,
      });

      const handleEditProduct = (e) => {
        e.preventDefault();
        editProduct(
          uproduct.title,
          uproduct.discription,
          uproduct.price,
          uproduct.rating,
          image
        );
      };
      const editProduct = async (title, discription, price, rating, image) => {
        try {
          const response = await fetch(
            `https://task-3-backend.herokuapp.com/api/products/updateproduct/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, discription, price, rating, image}),
            }
          );
          const updatedproduct = await response.json();
          if (response.status === 200) {
            toast.success(updatedproduct.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          if (response.status === 400) {
            updatedproduct.errors.forEach(element => {
              toast.error(element.msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            });
          }
        } catch (err) {
          
            toast.error('Server is under Maintinance', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
          console.log(err);
        }
      };


      const onChange = (e) => {
        setUproduct({ ...product, [e.target.name]: e.target.value });
      };
  return (
    <>
         <div className="w-full bg-gradient-to-br from-[#34e89e]  to-[#0f3443]">
        <div className="w-full flex flex-col md:flex-row justify-center">
        <div className={`w-11/12 h-40 md:h-auto md:mx-2 md:w-1/2 flex justify-center text-center items-center p-4 mx-auto my-8 rounded-lg border-dashed text-3xl font-semibold ${isDragActive?" border-green-700 ":" border-rose-800 "} border-rose-800 border-2 cursor-pointer`} {...getRootProps()}>
            <input {...getInputProps()} className="h-full "/>
            DROP DOWN IMAGE HERE TO UPLOAD</div>

          <form className="w-full md:w-1/2  p-4 my-4 rounded-lg">
            <h1 className="text-blue-700 text-2xl font-semibold">
              EDIT PRODUCT
            </h1>
            <div className="my-2 grid grid-cols-1 gap-1">
              <input
                className="bg-blue-100 text-black p-2 rounded-lg placeholder:text-blue-800"
                type="text"
                name="title"
                id="title"
                defaultValue={product.title}
                placeholder="Title"
                required
                minLength="2"
                onChange={onChange}
              />
            </div>
            <div className="my-2 grid grid-cols-1 gap-1">
              <textarea
                className="bg-blue-200 text-black p-2 rounded-lg resize-none placeholder:text-blue-800"
                name="discription"
                id="discription"
                defaultValue={product.discription}
                cols="30"
                rows="10"
                placeholder="Discription"
                onChange={onChange}
              ></textarea>
            </div>
            <div className="my-2 grid grid-cols-1 md:grid-cols-2 gap-1">
              <input
                className="bg-blue-100 text-black p-2 rounded-lg placeholder:text-blue-800"
                type="number"
                name="price"
                id="price"
                defaultValue={product.price}
                placeholder="Price"
                min="1"
                required
                onChange={onChange}
              />

              <select
                id="rating"
                className="bg-blue-100 text-black p-2 rounded-lg placeholder:text-blue-800"
                name="rating"
                defaultValue={product.rating}
                onChange={onChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </form>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 rounded-2xl mb-4 text-xl font-semibold py-0.5  px-4"
            onClick={handleEditProduct}
          >
            SAVE
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default updateProduct;

export async function getServerSideProps(context) {
  const id = context.query.id;
try {
 const response = await fetch(
    `https://task-3-backend.herokuapp.com/api/products/fetchproduct/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return { props: {product: data}};
} catch (error) {
    console.log(error)
}
}
