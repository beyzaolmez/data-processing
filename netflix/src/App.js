import React from 'react';
import ItemList from './AdminPanel/ItemList'; 
import AddItemForm from './AdminPanel/AddItemForm'; 
import DeleteButton from './AdminPanel/DeleteButton';

function App() {
  return (
    <div>
      <AddItemForm />
      <ItemList />
      <DeleteButton />
    </div>
  );
}

export default App;
