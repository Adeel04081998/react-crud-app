import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import { Item } from "../types/Item";
import { getItemById ,updateItem} from "../services/ItemService";

const EditItem = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [item, setItem] = useState<Item | null>(null);
  
    useEffect(() => {
      if (id) {
        getItemById(Number(id)).then(setItem);
      }
    }, [id]);
  
    const handleUpdate = (updatedItem: Omit<Item, "id">) => {
      updateItem(Number(id), updatedItem).then((newUpdatedItem) => {
        navigate("/", { state: { updatedItem: { ...newUpdatedItem, id: Number(id) } } });
      });
    };
  
    return item ? (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Edit Item</h1>
        <ItemForm onSubmit={handleUpdate} initialData={item} />
        <button
          className="mt-4 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
          onClick={() => navigate(`/`)}
        >
          Cancel
        </button>
      </div>
    ) : (
      <p className="text-center text-gray-600">Loading...</p>
    );
  };
  
  export default EditItem;