import { useEffect, useState } from "react";
// import { getItems, addItem, deleteItem, updateItem } from "../services/itemService";

import ItemCard from "../components/ItemCard";
import ItemForm from "../components/ItemForm";
import { Item } from "../types/Item";
import { getItems ,addItem, deleteItem, updateItem } from "../services/ItemService";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/RouteConfig";

const Home = () => {
  const [items, setItems] = useState<Item[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch initial items
  useEffect(() => {
    getItems().then((data) => {
      setItems(data);
    });
  }, []);
  const handleAdd = (newItem: Omit<Item, "id">) => {
    addItem(newItem).then((createdItem) => {
      const newItemWithId = { ...createdItem, id: Date.now() };
      setItems((prevItems) => [...prevItems, newItemWithId]);
    });
  };

  const handleDelete = (id: number) => {
    deleteItem(id).then(() => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    });
  };


  const handleViewDetails = (id: number) => {
    navigate(ROUTES.ITEM_DETAIL.replace(":id",id.toString()))
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Item List</h1>
      <ItemForm onSubmit={handleAdd} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onDelete={handleDelete}
          onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;