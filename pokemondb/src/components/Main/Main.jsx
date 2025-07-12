import "./main.css";

const Home = ({
  query,
  setQuery,
  pokemon,
  loading,
  showShiny,
  setShowShiny,
  handleSearch,
  showMoves,
  setShowMoves,
  evolutionChain,
  showEvolution,
  handleShowEvolution,
  showAbilities,
  setShowAbilities,
  weaknesses = [],
  strengths = [],
  pokemonData,
  species,
  currentIndex,
  handleNext,
  handlePrev,
  pokedexList,
  handleSave,
  currentUser,
}) => {
  return (
    <main className="home">
      <div className="home__intro">
        <h1 className="home__welcome">
          <span className="font-arial-normal">Welcome to </span>
          <div className="home__container-main">
            <span className="font-bungee">POKÉMON</span>
            <span className="font-arial">DB</span>
          </div>
        </h1>
        <p className="home__description">
          Explore your favorite Pokémon with ease!
        </p>

        <form onSubmit={handleSearch}>
          <input
            className="home__input"
            type="text"
            placeholder="Search Pokémon..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="home__submit" type="submit">
            Search
          </button>
        </form>
      </div>
      <section className="home__results">
        {loading && <p>Loading...</p>}
        {!loading && pokemon && (
          <div className="card__wrapper">
            <div className="card">
              <div className="card__heading">
                <h2 className="pokemon__name">{pokemon.name}</h2>
                <button
                  className="shiny-toggle"
                  type="button"
                  onClick={() => setShowShiny(!showShiny)}
                >
                  {showShiny} ✨
                </button>
                <p className="pokemon__species">{species}</p>
                <p className="pokemon__type">
                  Type: {pokemon.types?.join(", ") || "Unknown"}
                </p>
                <img
                  className="pokemon__image"
                  src={showShiny ? pokemon.imageShiny : pokemon.imageNormal}
                  alt={pokemon.name}
                />
               
                {currentUser && pokemon && (
                  <button className="pokemon__save-btn" onClick={() => handleSave(pokemon)}>
                    Save Pokémon
                  </button>
                )}
                <p className="pokemon-description">{pokemon.description}</p>

                {pokemonData?.stats.map((stat) => (
                  <div key={stat.stat.name} className="stat-line">
                    <strong>{stat.stat.name.toUpperCase()}:</strong>{" "}
                    {stat.base_stat}
                  </div>
                ))}
                <div>
                  {weaknesses.length > 0 && (
                    <div className="pokemon-weaknesses">
                      <h3>Weaknesses</h3>
                      <ul className="weakness">
                        {weaknesses.map(({ type }) => (
                          <li className="strenght-list" key={type}>
                            {type}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {strengths.length > 0 && (
                    <div className="pokemon-strengths">
                      <h3>Strengths</h3>
                      <ul className="strength">
                        {strengths.map((type) => (
                          <li className="strenght-list" key={type}>
                            {type}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {pokemon && (
                  <button
                    className="pokemon__evo-btn"
                    type="button"
                    onClick={handleShowEvolution}
                  >
                    {showEvolution
                      ? "Hide Evolution Chain"
                      : "Show Evolution Chain"}
                  </button>
                )}

                {showEvolution && (
                  <div className="evolution-chain">
                    <div className="evolution-images">
                      {evolutionChain.map((stage, index) => {
                        if (!stage || !stage.name) {
                          console.warn(
                            "Skipping corrupted evolution entry:",
                            stage
                          );
                          return null;
                        }

                        return (
                          <div
                            key={index}
                            className="evolution-stage"
                            onClick={() => handleSearch(stage.name)}
                            style={{ cursor: "pointer" }}
                          >
                            <img src={stage.image} alt={stage.name} />
                            <p>{stage.name}</p>
                            <p className="evolution-condition">
                              {stage.condition && stage.condition !== "—"
                                ? stage.condition
                                : "Does not evolve"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

                <div className="pokedex-nav">
                  <button
                    className="prev-btn"
                    onClick={handlePrev}
                    disabled={currentIndex <= 0}
                  >
                    ⬅️ Previous
                  </button>
                  <span className="current-name">{pokemon?.name}</span>
                  <button
                    className="next-btn"
                    onClick={handleNext}
                    disabled={currentIndex >= pokedexList.length - 1}
                  >
                    Next ➡️
                  </button>
                </div>
              </div>
            </div>
       
        )}
      </section>
    </main>
  );
};

export default Home;
