import { useState } from "react";
import { useForm } from "react-hook-form";
import "./CreateProduct.css";
import { categoriesData } from "./CreateCategoreData";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { toast } from "sonner";

const CreateProduct = () => {
  // const [mainCategory, setMainCategory] = useState("");
  // const [category, setCategory] = useState("");
  // const [subCategory, setSubCategory] = useState("");
  // const [categories, setCategories] = useState([]);
  // const [subCategories, setSubCategories] = useState([]);

  // const changeCountry = (event) => {
  //   setMainCategory(event.target.value);
  //   setCategories(
  //     categoriesData.find((ctr) => ctr.name === event.target.value).categories
  //   );
  // };
  // const changeState = (event) => {
  //   setCategory(event.target.value);
  //   setSubCategories(
  //     categories.find((state) => state.name === event.target.value)
  //       .subCategories
  //   );
  // };
  // const handleCity = (event) => {
  //   setSubCategory(event.target.value);
  // };

  // const { register, handleSubmit, reset } = useForm();
  // const [val, setVal] = useState([]);
  // const handleAdd = () => {
  //   const abc = [...val, []];
  //   setVal(abc);
  // };

  // const handleChange = (onChangeValue, i) => {
  //   const inputData = [...val];
  //   inputData[i] = onChangeValue.target.value;
  //   setVal(inputData);
  //   console.log("data", val);
  // };

  // const handleDelete = (i) => {
  //   const deleteVal = [...val];
  //   deleteVal.splice(i, 1);
  //   setVal(deleteVal);
  // };

  //  const imageStorageKey = "a3d4bff21c6d258146feb02c43808485";
  // const onSubmit = async (data) => {
  //   const proseed = window.confirm(`Are you sure Create New Product ?`);
  //   if (proseed) {
  //     const image = data.image1[0];
  //     const image2 = data.image2[0];
  //     const formData = new FormData();
  //     formData.append("image", image, image2);
  //     const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
  //     fetch(url, {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then((imgData) => {
  //         if (imgData.success) {
  //           //  const img = imgData.data.url;
  //           const newPorduct = {
  //             mainCategory: mainCategory,
  //             category: category,
  //             subCategory: subCategory,
  //             name: data.name,
  //             brand: data.brand,
  //             availableQuantity: data.availableQuantity,
  //             stockStatus: data.stockStatus,
  //             price: data.price,
  //             ragularPrice: data.ragularPrice,
  //             offerPrice: data.offerPrice,
  //             description: data.description,
  //             description2: val,
  //             image1: imgData.data.url,
  //             image2: imgData.data.url,
  //           };
  //           fetch("http://localhost:5000/api/v1/products", {
  //             method: "POST",
  //             headers: {
  //               "content-type": "application/json",
  //               authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //             },
  //             body: JSON.stringify(newPorduct),
  //           })
  //             .then((res) => res.json())
  //             .then((inserted) => {
  //               //   console.log('inser', inserted)
  //               if (inserted.insertedId) {
  //                 toast.success("Added New Product");
  //                 reset();
  //               } else {
  //                 toast.error("Faield to Added New Product");
  //               }
  //             });
  //         }
  //       });
  //   }
  // };

  return (
    <>
      <div className="dashboard-dev2">
        <PageTitle pageTitle="Create Product |" />
        <div className="pt-4 ps-4">
          <h4 className="fw-bold side-header">Create Product</h4>
        </div>
        <hr />
        <div className="create-product-dev mt-5 mb-5">
          <h4 className="text-center mb-4 pt-4">Create Product</h4>
          <div className="pb-4">
            {/*  <form onSubmit={handleSubmit(onSubmit)}>
              <label>Main Category</label>
              <select
                value={mainCategory}
                onChange={changeCountry}
                key={mainCategory}
                required
              >
                <option value="" hidden>
                  Main Category--
                </option>
                {categoriesData.map((ctr) => (
                  <option value={ctr.name}>{ctr.name}</option>
                ))}
              </select>
              <label>Category</label>
              <select value={category} onChange={changeState} required>
                <option value="" hidden>
                  Category--
                </option>
                {categories.map((state) => (
                  <option value={state.value}>{state.name}</option>
                ))}
              </select>
              <label>Sub Category</label>
              <select value={subCategory} onChange={handleCity}>
                <option value="" hidden>
                  Sub Category--
                </option>
                {subCategories.map((city) => (
                  <option value={city}>{city}</option>
                ))}
              </select>
              <label>Brand</label>
              <select {...register("brand", { required: true })} required>
                <option value="" hidden>
                  Select Brand ---
                </option>
                <option value="No Brand">No Brand</option>
                <option value="Mahsez">Mahsez</option>
                <option value="Alif Attar">Alif Attar</option>
              </select>
              <label>StockStatus</label>
              <select {...register("stockStatus", { required: true })} required>
                <option value="" hidden>
                  Select Stock Status ---
                </option>
                <option value="In Stock">In Stock</option>
                <option value="Out Of Stock">Out Of Stock</option>
              </select>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Product Name"
                {...register("name", { required: true })}
                required
              />
              <label>Purchase Price</label>
              <input
                type="number"
                placeholder="Enter Product Available Quantity"
                {...register("availableQuantity", { required: true })}
                required
              />
              <label>Available Quantity</label>
              <input
                type="number"
                placeholder="Enter Product Available Quantity"
                {...register("availableQuantity", { required: true })}
                required
              />
              <label>Price</label>
              <input
                type="number"
                placeholder="Enter Product Regular Price"
                {...register("price", { required: true })}
                required
              />
              <label>Ragular Price</label>
              <input
                type="number"
                placeholder="Enter Product Regular Price"
                {...register("ragularPrice", { required: true })}
                required
              />
              <label>Offer Price</label>
              <input
                type="number"
                placeholder="Enter Product Offer Price"
                {...register("offerPrice", { required: true })}
                required
              />
              <label>Discount Percentage</label>
              <input
                type="number"
                placeholder="Enter Product Offer Price"
                {...register("offerPrice", { required: true })}
                required
              />
              <label>Description Summary</label>
              <textarea
                type="text"
                placeholder="Enter Product Description-1"
                {...register("description", { required: true })}
                required
              />

              <div>
                <button onClick={() => handleAdd()}>Add</button>
                {val.map((data, i) => (
                  <div key={i}>
                    <input value={data} onChange={(e) => handleChange(e, i)} />
                    <button onClick={() => handleDelete(i)}>Delete</button>
                  </div>
                ))}
              </div>

              <input
                className=""
                type="file"
                {...register("image1", {
                  required: "Photo is Required",
                })}
                required
              />

              <input
                className=""
                type="file"
                {...register("image2", {
                  required: "Photo is Required",
                })}
                required
              />

              <input type="Submit" value="Add Product" />
            </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
