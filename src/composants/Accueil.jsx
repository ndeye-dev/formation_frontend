import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Accueil() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingFormation, setEditingFormation] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const [updatedFormation, setUpdatedFormation] = useState({
    nom: '',
    dateFormation: '',
    nombreUtilisations: '',
    thematique: '',
    prix: ''
  });

  useEffect(() => {
    axios.get('https://formation-backend.onrender.com/api/formations')
      .then(response => {
        setFormations(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Erreur de chargement des formations');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) {
      axios.delete(`https://formation-backend.onrender.com/api/formations/${id}`)
        .then(() => {
          setFormations(formations.filter(formation => formation._id !== id));
        })
        .catch(error => {
          alert('Erreur lors de la suppression de la formation');
        });
    }
  };

  // Afficher les détails
  const handleDetails = (id) => {
    if (showDetails === id) {
      setShowDetails(null);
    } else {
      setShowDetails(id);
    }
  };

  // Initialiser la modification de la formation
  const handleEdit = (formation) => {
    setEditingFormation(formation);
    setUpdatedFormation({
      nom: formation.nom,
      dateFormation: formation.dateFormation,
      nombreUtilisations: formation.nombreUtilisations,
      thematique: formation.thematique,
      prix: formation.prix
    });
  };

  // Mettre à jour une formation
  const handleUpdate = (e) => {
    e.preventDefault();

    const { nom, dateFormation, nombreUtilisations, thematique, prix } = updatedFormation;

    if (!nom || !dateFormation || !nombreUtilisations || !thematique || !prix) {
      alert('Tous les champs sont requis');
      return;
    }

    axios.put(`https://formation-backend.onrender.com/api/formations/${editingFormation._id}`, updatedFormation)
      .then(response => {
        setFormations(formations.map(formation => 
          formation._id === editingFormation._id ? response.data : formation
        ));
        setEditingFormation(null);
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour:", error);
        alert('Erreur lors de la mise à jour de la formation');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFormation({
      ...updatedFormation,
      [name]: value
    });
  };

  return (
    <div className="container mx-auto p-4 bg-blue-50">
      <h1 className="text-3xl font-extrabold text-blue-600 mb-6">Formations</h1>
      
      {loading ? (
        <div className="text-center text-gray-500">Chargement...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formations.map((formation) => (
            <div key={formation._id} className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-200 hover:border-blue-500">
              <h2 className="text-lg font-semibold text-blue-700">{formation.nom}</h2>
              <p className="text-gray-700">Date de la formation: {new Date(formation.dateFormation).toLocaleDateString()}</p>
              <p className="text-gray-700">Nombre d'utilisations: {formation.nombreUtilisations}</p>
              <p className="text-gray-700">Thématique: {formation.thematique}</p>
              <p className="text-gray-700">Prix: {formation.prix} </p>
              <p className="text-gray-700">Date d'ajout: {new Date(formation.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-700">Dernière modification: {new Date(formation.updatedAt).toLocaleDateString()}</p>

              <div className="mt-2 flex justify-between">
                <button 
                  className="bg-blue-500 text-white p-2 rounded-lg"
                  onClick={() => handleDetails(formation._id)}
                >
                  {showDetails === formation._id ? 'Masquer' : 'Voir détails'}
                </button>
                <button 
                  className="bg-yellow-500 text-white p-2 rounded-lg"
                  onClick={() => handleEdit(formation)}
                >
                  Modifier
                </button>
                <button 
                  className="bg-red-500 text-white p-2 rounded-lg"
                  onClick={() => handleDelete(formation._id)}
                >
                  Supprimer
                </button>
              </div>

              {showDetails === formation._id && (
                <div className="mt-4 text-gray-500">
                  <p>Thématique: {formation.thematique}</p>
                  <p>Prix: {formation.prix} €</p>
                  <p>Date de la formation: {new Date(formation.dateFormation).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Formulaire de modification */}
      {editingFormation && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border-2 border-blue-200 ">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Modifier la formation</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              name="nom"
              value={updatedFormation.nom}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nom de la formation"
              required
            />
            <input
              type="date"
              name="dateFormation"
              value={updatedFormation.dateFormation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="number"
              name="nombreUtilisations"
              value={updatedFormation.nombreUtilisations}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nombre d'utilisations"
              required
            />
            <input
              type="text"
              name="thematique"
              value={updatedFormation.thematique}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Thématique"
              required
            />
            <input
              type="number"
              name="prix"
              value={updatedFormation.prix}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Prix "
              required
            />
            <button 
              type="submit" 
              className=" bg-green-500 text-white p-2 rounded-lg"
            >
              Modifier
            </button>
            <button
              type="button"
              onClick={() => setEditingFormation(null)}
              className=" bg-gray-500 text-white p-2 rounded-lg mt-2"
            >
              Annuler
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Accueil;
