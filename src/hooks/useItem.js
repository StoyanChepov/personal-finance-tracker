import itemAPI from "../api/item-api";
import { useEffect, useState } from "react";

export function CreateOneItem() {
  const createItemHandler = (name) => itemAPI.create(name);
  console.log("Res", createItemHandler);

  return createItemHandler;
}

export function GetAllItems(userId) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const items = await itemAPI.getAll();
      console.log("Items to frontend", items);

      setItems(items);
    })();
  }, [userId]);

  return [items, setItems];
}

export function GetAllUnits(userId) {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    (async () => {
      const items = await itemAPI.getAllUnits();
      console.log("units to frontend", items);
      setUnits(items);
    })();
  }, [userId]);

  return [units, setUnits];
}

export function GetAllItemTypes(userId) {
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      (async () => {
        const items = await itemAPI.getAllItemTypes();
        console.log("Item types to frontend", items);
  
        setItems(items);
      })();
    }, [userId]);
  
    return [items, setItems];
  }
