import { useState, useEffect } from "react";
import expenseAPI from "../api/expense-api";
import aggregationAPI from "../api/aggregation-api";

export function GetAllExpenses(type) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    (async () => {
      let expenses = await expenseAPI.getAll();
      if (expenses.length > 0) {
        expenses = expenses.filter((expense) => expense.type === type);
      }
      setExpenses(expenses);
    })();
  }, [type]);

  return [expenses, setExpenses];
}

export function GetAggregatedExpenses(type, number) {
  const [aggregatedExpenses, setAggregatedExpenses] = useState([]);

  useEffect(() => {
    (async () => {
      const expenses = await aggregationAPI.getChartData(type, number);
      setAggregatedExpenses(expenses);
    })();
  }, []);

  return [aggregatedExpenses, setAggregatedExpenses];
}

export function GetOneExpense(expenseId) {
  const [expense, setExpense] = useState({
    title: "",
    amount: 0,
    date: "",
    category: "",
    itemPositions: [],
  });

  useEffect(() => {
    (async () => {
      const expense = await expenseAPI.getById(expenseId);
      setExpense(expense);
    })();
  }, [expenseId]);

  return [expense, setExpense];
}

export function GetOneItemPosition(itemPosId) {
  const [itemPos, setItemPos] = useState({
    itemId: "",
    quantity: 0,
    price: 0,
    amount: 0,
    unit: {},
    item: {},
    positionId: "",
  });

  useEffect(() => {
    (async () => {
      if (itemPosId !== null && itemPosId !== undefined) {
        let itemPos = JSON.parse(
          sessionStorage.getItem("itemPositionsEdit")
        )?.find((item) => item._id === itemPosId);
        console.log("itemPos", itemPos);

        if (!itemPos) {
          itemPos = await expenseAPI.getItemPosById(itemPosId);
        }
        setItemPos(itemPos);
      }
    })();
  }, [itemPosId]);

  return [itemPos, setItemPos];
}

export function CreateOneExpense() {
  const expenseCreateHandler = (expenseData) => expenseAPI.create(expenseData);
  return expenseCreateHandler;
}
