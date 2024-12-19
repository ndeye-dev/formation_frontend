import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Accueil from './composants/Accueil';
import AjoutFormation from './composants/AjoutFormation';

function App() {
  return (
    <Router>
      <div className="App">
        
        <nav className="bg-blue-400 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            
            <h1 className="text-2xl font-semibold">Ma Plateforme</h1>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/Accueil"
                  className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full transition duration-300"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/AjoutFormation"
                  className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full transition duration-300"
                >
                  Ajouter Formation
                </Link>
              </li>
            </ul>
          </div>
        </nav>


        <Routes>
          <Route path="/Accueil" element={<Accueil />} />
          <Route path="/AjoutFormation" element={<AjoutFormation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
