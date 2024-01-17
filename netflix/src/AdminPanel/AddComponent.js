import React from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import './css/AdminPanel.css';

function App() {
  return (
    <div>
      <AddItemForm />
      <ItemList />
    </div>
  );
}

export default App;
