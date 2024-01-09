// App.js
import React from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';

function App() {
  return (
    <div>
      <AddItemForm />
      <ItemList />
    </div>
  );
}

export default App;
