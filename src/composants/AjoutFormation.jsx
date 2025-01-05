import React, { useState } from 'react';
import axios from 'axios';

function AjoutFormation() {
  const [nom, setNom] = useState('');
  const [dateFormation, setDateFormation] = useState('');
  const [nombreUtilisations, setNombreUtilisations] = useState('');
  const [thematique, setThematique] = useState('');
  const [prix, setPrix] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation de l'URL de l'image
    const imageValide = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg)$/;
    if (!imageUrl || !imageValide.test(imageUrl)) {
      setImageError("Veuillez entrer une URL d'image valide.");
      setLoading(false);
      return;
    } else {
      setImageError(null); 
    }

    if (!nom || !dateFormation || !nombreUtilisations || !thematique || !prix || !imageUrl) {
      setError("Tous les champs sont requis");
      setLoading(false);
      return;
    }

    const newFormation = {
      nom,
      dateFormation,
      nombreUtilisations: parseInt(nombreUtilisations),
      thematique,
      prix: parseFloat(prix),
      imageUrl
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
        setImageUrl('');
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
      {imageError && <div className="text-red-500 mb-4">{imageError}</div>}
      
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
        
        {/* Champ pour l'URL de l'image */}
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="URL de l'image"
          required
        />

        {/* Champ pour le prix */}
        <input
          type="number"
          step="0.01"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Prix"
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

      {/* Affichage de l'image */}
      <div className="mt-4 text-center">
        <h3 className="font-semibold">Aperçu de l'image :</h3>
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt="Aperçu de l'image"
            className="mx-auto mt-2 rounded-lg w-48 h-48 object-cover "
          />
        ) : (
          <div className="text-red-500 mt-2">L'URL de l'image est invalide ou vide.</div>
        )}
      </div>
    </div>
  );
}

export default AjoutFormation;
