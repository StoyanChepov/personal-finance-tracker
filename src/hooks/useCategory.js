import categoryAPI from "../api/category-api";
import { useEffect, useState } from "react";

export function CreateOneCategory() {
  const createCategoryHandler = (name) => categoryAPI.create(name);
  console.log("Res", createCategoryHandler);

  return createCategoryHandler;
}

export function GetAllCategories(userId) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const categories = await categoryAPI.getAll();
      console.log("Categorys to frontend", categories);

      setCategories(categories);
    })();
  }, [userId]);

  return [categories, setCategories];
}
