"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
// import { on } from "events";
interface QuestionModalProps {
  // Define props here
  isOpen: boolean;
  onClose: () => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      question: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      question: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-hiden ">
      <div className="bg-white rounded-xl py-2 px-8">
        <div id="header" className="flex items-center gap-4 justify-start ml-4">
          <div className="w-16 h-16 border-[1px] border-accentOrange rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="/path/to/your/image.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounde-xl py-2 px-4 border-2 border-accentOrange rounded-full flex items-center justify-center">
            <p>
              Voud avez une <span>Question</span> ? n&apos;hesitez pas a
              demander
            </p>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4 p-4">
            <div className="w-full flex gap-4 ">
              <div className="w-1/2 py-4 ">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full px-2 h-12 rounded-xl bg-[#EEEEEE] border border-transparent  focus:outline-none focus:ring-2 focus:ring-accentOrange focus:border-transparent"
                  placeholder="Entrez votre nom s'il vous plaît"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  autoComplete="off"
                />
                {formik.errors.name ? (
                  <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="w-1/2  py-4 px-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-2 h-12 bg-[#EEEEEE] rounded-xl border border-transparent  focus:outline-none  focus:ring-2 focus:ring-accentOrange focus:border-transparent"
                  placeholder="Entrez votre email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  autoComplete="off"
                />
                {formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            <textarea
              name="question"
              id="question"
              placeholder="Écrivez votre question ici"
              onChange={formik.handleChange}
              value={formik.values.question}
              className="h-32 w-[50vw]  resize-none rounded-xl focus:outline-none  bg-[#EEEEEE] p-4 border border-transparent  focus:ring-2 focus:ring-accentOrange focus:border-transparent"
              autoComplete="off"
            />
            {formik.errors.question ? (
              <div className="text-red-500">{formik.errors.question}</div>
            ) : null}
            <div className="w-full flex gap-4 items-end justify-end">
              <button
                type="submit"
                className="px-8 rounded-lg py-4  font-bold  border border-[1px] border-accentOrange text-accentOrange"
                onClick={() => {
                  onClose();
                  formik.resetForm();
                }}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 rounded-lg py-4 text-white font-bold bg-[#FF6F61]"
              >
                Soumettre une question
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;
