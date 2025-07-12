import "./Profile.css";
import { useEffect, useState } from "react";

const Profile = ({ currentUser, favorites, setFavorites }) => {
  useEffect(() => {
    if (currentUser) {
      const key = `${currentUser.email}_favorites`;
      const saved = JSON.parse(localStorage.getItem(key)) || [];
      console.log("Loaded favorites:", saved);
    }
  }, [currentUser]);

  const handleReleasePokemon = (nameToRelease) => {
    const updatedFavorites = favorites.filter(
      (poke) => poke.name !== nameToRelease
    );

    const key = `${currentUser.email}_favorites`;
    localStorage.setItem(key, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const handleClearFavorites = () => {
    if (!currentUser) return;

    const key = `${currentUser.email}_favorites`;
    localStorage.removeItem(key);
    setFavorites([]); // clear state so UI updates
  };

  const [shinyMap, setShinyMap] = useState({});

  return (
    <div className="profile">
      <h1 className="profile__name">Hello, {currentUser?.name || "Trainer"}!</h1>
      <p className="profile__description">Welcome to your Pokédex portal</p>

      <section>
        <h2 className="profile__info">
          You have <span className="profile__highlight">{favorites.length}</span> caught
          Pokémon!
        </h2>

        {favorites.length === 0 ? (
          <p>You haven't saved any Pokémon yet.</p>
        ) : (
          <div className="favorites-container">
            <ul className="favorites__list">
              {favorites.map((poke, index) => {
                if (!poke || !poke.name || !poke.sprite || !poke.description) {
                  console.warn(
                    "Skipping broken favorite at index:",
                    index,
                    poke
                  );
                  return null;
                }

                return (
                  <li key={`${poke.name}-${index}`} className="profile__card">
                    <h3 className="card__name">{poke.name}</h3>
                    <img
                      className="card__image"
                      src={poke.sprite}
                      alt={poke.name}
                    />

          
                    <p className="card__description">
                       {poke.description}
                    </p>
                    <button
                      className="release-button"
                      onClick={() => handleReleasePokemon(poke.name)}
                    >
                      Release
                    </button>
                    
                  </li>
                );
              })}
            </ul>
            <button
              className="profile__releaseAll-btn"
              onClick={handleClearFavorites}
            >
              Release all Pokémon
            </button>
            <p className="profile__warning">Clicking this will release ALL pokemon back into the wild!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
