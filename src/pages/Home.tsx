import { useEffect, useState } from "react";
import { getItems, addItem, deleteItem } from "../services/ItemService";
import ItemCard from "../components/ItemCard";
import { Item } from "../types/Item";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/RouteConfig";
import ItemForm from "../components/ItemForm";

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal

  const navigate = useNavigate();

  useEffect(() => {
    getItems().then((data) => {
      setItems(data);
    });
  }, []);

  const handleAdd = (newItem: Omit<Item, "id">) => {
    addItem(newItem).then((createdItem) => {
      const newItemWithId = { ...createdItem, id: Date.now() };
      setItems((prevItems) => [...prevItems, newItemWithId]);
      setModalOpen(false); // Close modal after adding
    });
  };

  const handleDelete = (id: number) => {
    deleteItem(id).then(() => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    });
  };

  const handleViewDetails = (id: number) => {
    navigate(ROUTES.ITEM_DETAIL.replace(":id", id.toString()));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Item List</h1>

      {/* Button to open modal */}
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={() => setModalOpen(true)}
      >
        Add Record
      </button>

      {/* ItemForm with Modal (Modal controlled from Home) */}
      <ItemForm onSubmit={handleAdd} modalOpen={modalOpen} setModalOpen={setModalOpen} />

      {/* Item List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
