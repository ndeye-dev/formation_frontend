import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

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
    prix: '',
    imageUrl: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDetails = (id) => {
    setShowDetails(showDetails === id ? null : id);
  };

  const handleEdit = (formation) => {
    setEditingFormation(formation);
    setUpdatedFormation({
      nom: formation.nom,
      dateFormation: formation.dateFormation,
      nombreUtilisations: formation.nombreUtilisations,
      thematique: formation.thematique,
      prix: formation.prix,
      imageUrl: formation.imageUrl
    });
    setIsModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { nom, dateFormation, nombreUtilisations, thematique, prix, imageUrl } = updatedFormation;

    if (!nom || !dateFormation || !nombreUtilisations || !thematique || !prix || !imageUrl) {
      alert('Tous les champs sont requis');
      return;
    }

    axios.put(`https://formation-backend.onrender.com/api/formations/${editingFormation._id}`, updatedFormation)
      .then(response => {
        setFormations(formations.map(formation =>
          formation._id === editingFormation._id ? response.data : formation
        ));
        setIsModalOpen(false);
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

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFormation(null);
  };

  const renderImage = (imageUrl) => {
    const defaultImage = "https://via.placeholder.com/150"; 

    if (imageUrl && imageUrl.startsWith("http")) {
      return (
        <img
          src={imageUrl}
          alt="Formation"
          className="w-full h-48 object-cover mb-4 rounded"
          onError={(e) => e.target.src = defaultImage}  // Si l'image échoue à se charger, on met l'image par défaut
        />
      );
    }

    return (
      <img
        src={defaultImage}
        alt="Image par défaut"
        className="w-full h-48 object-cover mb-4 rounded"
      />
    );
  };

  return (
    <div className="container mx-auto p-4 bg-blue-50">
      <div className='flex justify-between items-center '>
        <h1 className="text-3xl font-extrabold text-blue-600 mb-6">Formations</h1>

        <ul>
          <li>
            <Link
              to="/AjoutFormation"
              className="text-white bg-blue-600 hover:bg-blue-600 hover:text-white px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-full transition duration-300 text-xs sm:text-sm md:text-base"
            >
              Ajouter Formation
            </Link>
          </li>
        </ul>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Chargement...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formations.map((formation) => (
            <div key={formation._id} className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-200 hover:border-blue-500">
              {renderImage(formation.imageUrl)}

              <h2 className="text-lg font-semibold text-blue-700">{formation.nom}</h2>
              <p className="text-gray-700"><strong>Nombre d'utilisations:</strong> {formation.nombreUtilisations}</p>
              <p className="text-gray-700"><strong>Date d'ajout:</strong> {new Date(formation.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-700"><strong>Dernière modification:</strong> {new Date(formation.updatedAt).toLocaleDateString()}</p>

              <div className="mt-2 flex justify-between">
                <button
                  className="text-blue-500 text-3xl p-2 rounded-lg px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 text-xs sm:text-sm md:text-base"
                  onClick={() => handleDetails(formation._id)}
                >
                  {showDetails === formation._id ? 'Masquer' : <FaEye />}
                </button>
                <div>
                  <button
                    className="text-yellow-500 text-white p-2 rounded-lg px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 text-xs sm:text-sm md:text-base"
                    onClick={() => handleEdit(formation)}
                  >
                    <HiPencilSquare />
                  </button>
                  <button
                    className="text-red-500 p-2 rounded-lg px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 text-xs sm:text-sm md:text-base"
                    onClick={() => handleDelete(formation._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>

              {showDetails === formation._id && (
                <div className="mt-4 text-gray-500">
                  <p><strong>Thématique:</strong> {formation.thematique}</p>
                  <p><strong>Prix:</strong> {formation.prix} fcfa</p>
                  <p><strong>Date de la formation:</strong> {new Date(formation.dateFormation).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Modifier la formation</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="nom"
                value={updatedFormation.nom}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Nom de la formation"
                required
              />
              <input
                type="date"
                name="dateFormation"
                value={updatedFormation.dateFormation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <input
                type="number"
                name="nombreUtilisations"
                value={updatedFormation.nombreUtilisations}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Nombre d'utilisations"
                required
              />
              <input
                type="text"
                name="thematique"
                value={updatedFormation.thematique}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Thématique"
                required
              />
              <input
                type="number"
                name="prix"
                value={updatedFormation.prix}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Prix"
                required
              />
              <input
                type="text"
                name="imageUrl"
                value={updatedFormation.imageUrl}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="URL de l'image"
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-400 p-2 rounded-lg"
                  onClick={closeModal}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded-lg"
                >
                 Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accueil;
