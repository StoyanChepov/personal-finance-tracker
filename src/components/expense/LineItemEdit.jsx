import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LineItem({
  quantity,
  price,
  amount,
  item,
  unit,
  _id,
  setShowItemPosModalEdit,
  setItemPosId,
}) {
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };
  const itemPosEditHandler = async () => {
    console.log("Hovered Id: ", hoveredId);
    if (hoveredId !== null) {
      setShowItemPosModalEdit(true);
      setItemPosId(hoveredId);
    }
  };
  return (
    <tr
      key={_id}
      onMouseEnter={() => handleMouseEnter(_id)}
      onClick={itemPosEditHandler}
    >
      <td>{item?.name}</td>
      <td>
        {quantity} {unit?.name}
      </td>
      <td>{price} $</td>
      <td>{amount} $</td>
    </tr>
  );
}
