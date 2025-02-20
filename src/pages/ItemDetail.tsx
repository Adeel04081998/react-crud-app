import { Item } from "../types/Item";
import { getItemById,updateItem } from "../services/ItemService";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    if (id) {
      getItemById(Number(id)).then(setItem);
    }
  }, [id]);

  return item ? (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border">
      <h1 className="text-2xl font-bold text-gray-800">{item.title}</h1>
      <p className="text-gray-600 mt-2">{item.body}</p>
      <div className="flex gap-4 mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          onClick={() => navigate("/")} // Navigate back to home
        >
          Back to Home
        </button>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-600">Loading...</p>
  );
};

export default ItemDetail;
