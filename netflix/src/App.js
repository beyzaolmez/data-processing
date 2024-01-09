import React from 'react';
import ProfilePage from './ProfilePage.js';
import ItemList from './AdminPanel/ItemList'; // Import ItemList
import AddItemForm from './AdminPanel/AddItemForm'; // Import AddItemForm
import DeleteButton from './AdminPanel/DeleteButton'; // Import DeleteButton

function App() {
  return (
    <div>
      <AddItemForm /> // Use AddItemForm
      <ItemList /> // Use ItemList
      <DeleteButton /> // Use DeleteButton
    </div>
  );
}

export default App;
