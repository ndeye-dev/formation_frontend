import React, { useState } from 'react';
import axios from 'axios';

function AjoutFormation() {
 
  const [nom, setNom] = useState('');
  const [dateFormation, setDateFormation] = useState('');
  const [nombreUtilisations, setNombreUtilisations] = useState('');
  const [thematique, setThematique] = useState('');
  const [prix, setPrix] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!nom || !dateFormation || !nombreUtilisations || !thematique || !prix) {
      setError("Tous les champs sont requis");
      setLoading(false);
      return;
    }

    const newFormation = {
      nom,
      dateFormation,
      nombreUtilisations: parseInt(nombreUtilisations),
      thematique,
      prix: parseFloat(prix)
    };

    // Envoi de la requête POST au backend
    axios.post('https://formation-backend.onrender.com/api/formations', newFormation)
      .then(response => {
        setLoading(false);
        setNom('');
        setDateFormation('');
        setNombreUtilisations('');
        setThematique('');
        setPrix('');
        alert('Formation ajoutée avec succès!');
      })
      .catch(error => {
        setLoading(false);
        setError('Erreur lors de l\'ajout de la formation');
      });
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Ajouter une formation</h2>
      
      {/* Affichage de l'erreur, si elle existe */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ pour le nom de la formation */}
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Nom de la formation"
          required
        />

        {/* Champ pour la date de la formation */}
        <input
          type="date"
          value={dateFormation}
          onChange={(e) => setDateFormation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Champ pour le nombre d'utilisations */}
        <input
          type="number"
          value={nombreUtilisations}
          onChange={(e) => setNombreUtilisations(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Nombre d'utilisations"
          required
        />

        {/* Champ pour la thématique */}
        <input
          type="text"
          value={thematique}
          onChange={(e) => setThematique(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Thématique"
          required
        />

        {/* Champ pour le prix */}
        <input
          type="number"
          step="0.01"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Prix "
          required
        />

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Ajout en cours...' : 'Ajouter la formation'}
        </button>
      </form>
    </div>
  );
}

export default AjoutFormation;
