import React from 'react';
import './App.css';
import UserNote from './ components/UserNote';
import ClientData from './ components/ClientData';




const App:React.FC = () => {


  return (
    <>
    <div className="min-h-screen bg-gray-100 p-4">
      <div><h3 className="text-3xl font-bold text-center mb-6">User Note Tracking</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserNote />
          <ClientData />


        </div>



    </div>
    
    
    
    
    
    
    
    
    </>
  )
}

export default App;
