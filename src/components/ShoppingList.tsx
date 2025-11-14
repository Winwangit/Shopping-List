import { useState } from "react";

interface Item {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

function ShoppingList() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

  const addItem = () => {
    if (!name.trim() || quantity <= 0 || price <= 0) return;
    const newItem: Item = {
      id: Date.now(),
      name,
      quantity,
      price,
    };
    setItems([...items, newItem]);
    setName("");
    setQuantity(1);
    setPrice(0);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const grandTotal = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div style={{ marginTop: "1rem", maxWidth: "500px" }}>
      <h2>Add Item</h2>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "0.5rem", padding: "0.3rem" }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        style={{ marginRight: "0.5rem", padding: "0.3rem", width: "70px" }}
        min={1}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        style={{ marginRight: "0.5rem", padding: "0.3rem", width: "80px" }}
        min={0}
      />
      <button onClick={addItem} style={{ padding: "0.3rem 0.5rem" }}>
        Add
      </button>

      <h2 style={{ marginTop: "1rem" }}>Shopping List</h2>
      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc" }}>Item</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Qty</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Price</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Total</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{ padding: "0.2rem 0.4rem" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 style={{ marginTop: "1rem" }}>Grand Total: ${grandTotal.toFixed(2)}</h3>
    </div>
  );
}

export default ShoppingList;
