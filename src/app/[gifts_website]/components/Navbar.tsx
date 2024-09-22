"use client";
import {useState, useEffect } from "react";
import axiosInstance from "axios";
import { Category } from "@/app/[gifts_website]/types";
import Button from "@/app/[gifts_website]/components/Button";
import QuestionModal from "./QuestionModal";

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categories_name, setCategoriesName] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
    // console.log("Categories:", categories);
    const categories_name = categories.map((category) => category.name);
    setCategoriesName(categories_name);
  }, [categories]);

  useEffect(() => {
    console.log("Categories Name:", categories_name);
  }, [categories_name]);

  return (
    <>
      <h1>Gifts Website</h1>
      <div id="navigation_bar " className="flex gap-4">
        {categories_name.map((name, index) => (
          <div key={index} className="nav-item">
            {name}
          </div>
        ))}
      </div>
      <Button onClick={openModal}>Question?</Button>
      <QuestionModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
