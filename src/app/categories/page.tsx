"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../utils/supabaseClient";
import axiosInstance from "@/utils/axiosInstance";
import useUserStore from "../../store/useUserStore";
import { toast, Bounce } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";

// import { on } from "events";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ProdcutModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}
// components/ProductCard.tsx

interface ProductCardProps {
  title: string;
  iconSrc: string;
  productImgSrc: string;
  CategoriId: string;
  // category: string;
  // onAddProduct: () => void;
  onDelete: () => void;
}

import { useFormik } from "formik";
import * as Yup from "yup";

interface ProdcutModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  CategoriId: string;
}

const ProductModal: React.FC<ProdcutModalProps> = ({
  isOpen,
  onClose,
  category,
  CategoriId,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      productName: "",
      productNote: "",
      categoryImage: null,
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Product Name is required"),
      productNote: Yup.string().optional(),
      categoryImage: Yup.mixed().required("Product image is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission
      const formData = new FormData();
      formData.append("name", values.productName);
      formData.append("category_id", CategoriId);
      formData.append("note", values.productNote);
      if (values.categoryImage) {
        formData.append("image", values.categoryImage);
      }

      try {
        const response = await axiosInstance.post("/api/products", formData);

        if (response.status !== 201) {
          throw new Error("Failed to submit form");
        }

        // Handle successful form submission
        console.log("Form submitted successfully");
        toast.success("prduct hasben added sucessfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        onClose();
      } catch (error) {
        toast.error("something went wrong please retry later", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        console.error("Error submitting form:", error);
      }
      // console.log("categoryID", CategoriId);
      // console.log(values);
      // formik.isSubmitting = false;
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("categoryImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 overflow-hidden">
        {/* <div className="absolute bg-white w-full h-full z-50"></div> */}
        {formik.isSubmitting ? (
          <Skeleton className="absolute w-screen h-screen z-50 inset-0 " />
        ) : (
          ""
        )}
        <h2 className="text-2xl font-semibold mb-4">
          <span className="text-[#FF8572]">{category} </span>
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col justify-center w-full relative mb-8 ">
            <label
              htmlFor="categoryImage"
              className="block text-sm font-medium text-gray-700 rounded-full mb-4"
            >
              Product image
            </label>
            <div className="w-full flex justify-center">
              <div className="relative w-[150px] h-[150px] bg-black rounded-2xl overflow-hidden">
                <input
                  type="file"
                  id="categoryImage"
                  onChange={handleImageChange}
                  className="mt-1 rounded-full relative w-full h-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm opacity-0 z-40"
                  required
                />
                {imagePreview && (
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Category Preview"
                      className="w-full h-auto rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              {...formik.getFieldProps("productName")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
            {formik.touched.productName && formik.errors.productName ? (
              <div className="text-red-600 text-sm">
                {formik.errors.productName}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="productNote"
              className="block text-sm font-medium text-gray-700"
            >
              Product Note
            </label>
            <input
              type="text"
              id="productNote"
              {...formik.getFieldProps("productNote")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
            {formik.touched.productNote && formik.errors.productNote ? (
              <div className="text-red-600 text-sm">
                {formik.errors.productNote}
              </div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-[#FF8572] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#FF5E4D] ${
                formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={formik.isSubmitting}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  iconSrc,
  productImgSrc,
  onDelete,
  CategoriId,
  // onAddProduct,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [categories, setCategories] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md max-w-sm">
        <div className="w-full text-[#F57A7A] text-xl font-semibold mb-2 flex itemst-center justify-between">
          {/* <img src={iconSrc} alt="Icon" className="w-6 h-6 mr-2" /> */}
          {title}
          <button
            className=" bg-[#FF4D4D] text-white text-xs  p-2 rounded-md shadow-md hover:bg-[#FF1A1A]"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="w-[330px] h-[315px]">
            <img
              src={productImgSrc}
              alt="Product"
              className="rounded-lg w-full object-cover h-full"
            />
          </div>
        </div>

        <button
          className="w-full mt-4 bg-[#FF8572] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#FF5E4D]"
          onClick={openModal}
        >
          Add Product
        </button>
      </div>
      <ProductModal
        CategoriId={CategoriId}
        isOpen={isModalOpen}
        onClose={closeModal}
        category={title}
      />
    </>
  );
};

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const user = useUserStore((state) => state.user);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCategoryImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!categoryImage) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("categorie_image", categoryImage);
    formData.append("userId", user.id);

    try {
      setLoading(true);
      const response = await axiosInstance.post("/api/categories", formData);
      console.log("response", response);
      if (response.status == 201) {
        setLoading(false);
        setImagePreview(null);
        setCategoryName("");
        onClose();
      } else {
        setLoading(false);
        setCategoryName("");
        setCategoryImage(null);
        setError(response.data.message);
        setImagePreview(null);
      }
    } catch (error) {
      setLoading(false);
      setImagePreview(null);
      setError("An error occurred while submitting the form.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center w-full relative mb-4 ">
            <div className="relative w-[150px] h-[150px] bg-black rounded-full overflow-hidden">
              <label
                htmlFor="categoryImage"
                className="block text-sm font-medium text-gray-700 rounded-full"
              >
                {/* Category Image */}
              </label>
              <input
                type="file"
                id="categoryImage"
                onChange={handleImageChange}
                className="mt-1 rounded-full relative w-full h-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm opacity-0 z-50"
                required
              />
              {imagePreview && (
                <div className="  absolute inset-0 w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Category Preview"
                    className="w-full h-auto rounded-md object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-[#FF8572] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#FF5E4D] ${
                Loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={Loading}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface Category {
  id: string;
  name: string;
  image_url: string;
}

const UserPanel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/categories", {
          params: { userId: "74ea6898-b430-463d-a9b0-116eba3d69d0" },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    console.log("categories", categories);
  }, [categories]);

  const handleDelete = async (categoryId: string) => {
    try {
      await axiosInstance.delete(`/api/categories?categorie_Id=${categoryId}`);
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    const session = JSON.parse(
      localStorage.getItem("sb-tyovdghdcocaopwvmibm-auth-token") || "{}"
    );
    const accessToken = session.access_token;
    const refreshToken = session.refresh_token;
    console.log("refreshToken", refreshToken);
    document.cookie = `${"refresh_token"}=${refreshToken};  path=/; Secure; SameSite=Strict`;
    document.cookie = `${"access_token"}=${accessToken};  path=/; Secure; SameSite=Strict`;

    const userData = session.user;
    setUser(userData);
  }, []);

  return (
    <div className="flex h-full bg-[#FFF2EE] mt-12">
      {/* Main Content */}
      <div className="flex-1 p-8 w-full">
        {/* <Header /> */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#F57A7A]">Categorie</h2>
          <button
            onClick={openModal}
            className="bg-[#FF8572] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#FF5E4D]"
          >
            Add Categorie
          </button>
        </div>
        {/* Product Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-5 mt-14 gap-4 ">
          {categories.map((category) => (
            <ProductCard
              key={category.id}
              CategoriId={category.id}
              title={category.name}
              iconSrc={""}
              productImgSrc={category.image_url}
              onDelete={() => handleDelete(category.id)}
            />
          ))}
        </div>
      </div>
      <CategoryModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

// const Header: React.FC = () => {
//   const [user, setUser] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data, error } = await supabase.auth.getUser();
//       if (error) {
//         console.error("Error fetching user:", error);
//         router.push("/login"); // Redirect to login if no user is found
//       } else {
//         setUser(data.user.email || null);
//       }
//     };

//     fetchUser();
//   }, [router]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="flex justify-between items-center mb-6">
//       <input
//         type="text"
//         placeholder="Search for Product"
//         className="w-1/5 p-2 border border-gray-300 rounded-lg"
//       />
//       <div className="flex items-center space-x-4">
//         <span className="text-ms font-bold text-accentOrange">{user}</span>
//         <img
//           src="https://randomuser.me/api/portraits/men/32.jpg"
//           alt="User"
//           className="w-10 h-10 rounded-full"
//         />
//       </div>
//     </div>
//   );
// };

export default UserPanel;
