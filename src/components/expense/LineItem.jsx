import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LineItem({ quantity, price, amount, item, unit }) {
  console.log("LineItem", quantity, price, amount);
  return (
    <tr>
      <td>{item?.name}</td>
      <td>
        {quantity} {unit?.name}
      </td>
      <td>{price} $</td>
      <td>{amount} $</td>
    </tr>
  );
}
