import { Item } from "../types/Item";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const getItemById = async (id: number): Promise<Item> => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const addItem = async (item: Omit<Item, "id">): Promise<Item> => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "Content-Type": "application/json" },
  });
  
  return response.json();
};

export const updateItem = async (id: number, item: Omit<Item, "id">): Promise<Item> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(item),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const deleteItem = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
