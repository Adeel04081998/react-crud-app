import { useEffect, useState } from "react";
import { Item } from "../types/Item";


interface ItemFormProps {
  onSubmit: (item: Omit<Item, "id">) => void;
  initialData?: Omit<Item, "id">;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setBody(initialData.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onSubmit({ title, body });
      setTitle(""); // Clear title after submit
      setBody("");  // Clear body after submit
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter title..."
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Description</label>
        <textarea
          placeholder="Enter description..."
          className="border border-gray-300 p-3 w-full h-32 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ItemForm;
