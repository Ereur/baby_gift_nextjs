"use client";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabaseClient";
import { useRouter } from "next/navigation";
import illustration from "./illustration.png";
import Image from "next/image";

// Tailwind CSS classes based on your design
const Login: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    const { email, password } = values;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrors({ submit: error.message });
    } else {
      router.push("/categories");
      // navigate("/UserPanel"); // Navigate to the dashboard or another protected route
    }

    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-screen bg-background w-screen overflow-hidden ">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg p-6 shadow-lg max-w-4xl mx-auto ">
        {/* Left side: Image */}
        <div className="hidden md:block w-1/2 p-8">
          <Image
            src={illustration}
            alt="Baby Illustration"
            className="w-full"
          />
        </div>

        {/* Right side: Login form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-textPrimary mb-4">
            Baby Gift
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Connectez-vous à votre compte
          </p>

          <Formik
            initialValues={{ email: "", password: "", submit: null }}
            validationSchema={Yup.object({
              email: Yup.string().email("Email invalide").required("Requis"),
              password: Yup.string().required("Requis"),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-600 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Field
                      name="email"
                      type="email"
                      placeholder="test1245@gmail.com"
                      className="w-full p-3 border rounded-large border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {/* <span className="absolute inset-y-0 right-3 flex items-center">
                    <img
                      src="/path/to/placeholder.png"
                      alt="Email Icon"
                      className="h-5 w-5 text-primary"
                    />
                  </span> */}
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block text-gray-600 mb-2"
                  >
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full p-3 border rounded-large border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {/* <span className="absolute inset-y-0 right-3 flex items-center">
                    <img
                      src="/path/to/placeholder.png"
                      alt="Password Icon"
                      className="h-5 w-5 text-primary"
                    />
                  </span> */}
                  </div>
                  <div className="h-8  mt-2 ">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>
                {errors.submit && (
                  <div className="text-red-600 text-sm mb-4">
                    {errors.submit}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-primary focus:outline-none border-0  text-white font-semibold py-3 px-6 rounded-large shadow-btn hover:bg-opacity-80 transition"
                  disabled={isSubmitting}
                >
                  Se connecter
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <p
              onClick={() => router.push("/forgot-password")}
              className="cursor-pointer text-primary hover:text-accentBlue"
            >
              Mot de passe oublié ?
            </p>
          </div>
          <div className="flex mt-6 text-center gap-2 ">
            <span>Vous n'avez pas de compte ?</span>
            <p
              onClick={() => router.push("/signup")}
              className="cursor-pointer text-primary hover:text-accentBlue"
            >
              Inscrivez-vous.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
