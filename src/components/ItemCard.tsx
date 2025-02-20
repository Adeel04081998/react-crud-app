import { Item } from "../types/Item";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
  item: Item;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;

}

const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete ,onViewDetails}) => {

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border">
      <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
      <p className="text-gray-600">{item.body}</p>
      <div className="flex gap-2 mt-3">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          // onClick={() => navigate(`/item/${item.id}`)} // Navigate on button click
          onClick={() => onViewDetails(item.id)}

        >
          View Details
        </button>
       
      </div>
    </div>
  );
};

export default ItemCard;

