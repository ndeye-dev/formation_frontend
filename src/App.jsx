import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Accueil from './composants/Accueil';
import AjoutFormation from './composants/AjoutFormation';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="bg-blue-400 text-white p-3 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            {/* Titre */}
            <h1 className="text-2xl font-semibold">CoursEnLigne</h1>

            {/* Liste des liens de navigation */}
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-full transition duration-300 text-xs sm:text-sm md:text-base"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/AjoutFormation"
                  className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-full transition duration-300 text-xs sm:text-sm md:text-base"
                >
                  Ajouter Formation
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/AjoutFormation" element={<AjoutFormation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
