import { useState } from "react";
import { Item } from "../types/Item";
import Modal from "./ConfirmModal";

interface ItemCardProps {
  item: Item;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onViewDetails }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      onDelete(selectedId);
      setModalOpen(false); // Close modal after deleting
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border flex flex-col justify-between gap-4 shadow-lg">
      <div>
        <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
        <p className="text-gray-600">{item.body}</p>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          onClick={() => handleDeleteClick(item.id)}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          onClick={() => onViewDetails(item.id)}
        >
          View Details
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this item?"
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ItemCard;
