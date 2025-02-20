import { useEffect, useState } from "react";
import { Item } from "../types/Item";

interface ItemFormProps {
  onSubmit: (item: Omit<Item, "id">) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  initialData?: Omit<Item, "id">;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, modalOpen, setModalOpen, initialData }) => {
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
      setModalOpen(false); // Close modal after submission
    }
  };

  return (
    <>
      {/* Modal (Only shows when modalOpen is true) */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Item</h2>

            {/* Form Inside Modal */}
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

              {/* Buttons Inside Form */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Submit
              </button>

              <button
                type="button"
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition w-full"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemForm;
