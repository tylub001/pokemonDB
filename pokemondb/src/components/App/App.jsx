import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Home from "../Main/Main";
import Login from "../LoginModal/LoginModal";
import SignIn from "../RegisterModal/RegisterModal";
import { fetchPokemonByName, getPokemonSpecies } from "../../utils/api";
import { fetchEvolutionChain } from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { fetchPokemonWeaknesses } from "../../utils/api"; // Make sure it's exported!
import { fetchPokemonStrengths } from "../../utils/api";
import { getPokemonData } from "../../utils/api";
import Profile from "../Profile/Profile";

import { useNavigate } from "react-router-dom";

import Footer from "../Footer/Footer";

import "./App.css";

const App = () => {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showShiny, setShowShiny] = useState(false);

  const [evolutionChain, setEvolutionChain] = useState([]);
  const [showEvolution, setShowEvolution] = useState(false);
  const [showAbilities, setShowAbilities] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [weaknesses, setWeaknesses] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [pokemonData, setPokemonData] = useState(null);
  const [species, setSpecies] = useState("");

  const [currentIndex, setCurrentIndex] = useState(null);
  const [pokedexList, setPokedexList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const favoritesKey = `${currentUser.email}_favorites`;
    const savedFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    setFavorites(savedFavorites);
  }, [currentUser]);

  const handleSavePokemon = (pokemonToSave) => {
    if (!currentUser || !pokemonToSave?.name) return;

    const key = `${currentUser.email}_favorites`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];

    const alreadySaved = existing.some((p) => p.name === pokemonToSave.name);
    if (alreadySaved) return alert("You've already saved this Pokémon!");

    const simplifiedData = {
      name: pokemonToSave.name,
      sprite:
        pokemonToSave.sprites?.front_default ||
        pokemonToSave.imageNormal,
      description: pokemonToSave.description || "No description available.",
      shinySprite: pokemon.sprites?.front_shiny || null,
    };

    existing.push(simplifiedData);
    localStorage.setItem(key, JSON.stringify(existing));
    setFavorites([...existing]); // Refresh state for render
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear the current user and session
    setCurrentUser(null);
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
    setActiveModal(""); // Close any open modals
  };

  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
        const data = await res.json();
        const names = data.results.map((p) => p.name);
        setPokedexList(names);
      } catch (err) {
        console.error("Error fetching Pokédex list:", err);
      }
    };

    fetchAllPokemonNames();
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevName = pokedexList[currentIndex - 1];
      handleSearch(prevName);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < pokedexList.length - 1) {
      const nextName = pokedexList[currentIndex + 1];
      handleSearch(nextName);
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (pokemon?.name && pokedexList.length > 0) {
      const index = pokedexList.indexOf(pokemon.name.toLowerCase());
      setCurrentIndex(index !== -1 ? index : null);
    }
  }, [pokemon, pokedexList]);

  const pokemonName = pokemon?.name || "";

  useEffect(() => {
    getPokemonData(pokemonName).then((data) => {
      if (data) setPokemonData(data);
    });
  }, [pokemonName]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const result = await getPokemonSpecies(pokemonName); // Replace with dynamic name
        setSpecies(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSpecies();
  }, [pokemonName]);

  const handleSearch = async (input) => {
    let searchTerm;

    if (typeof input === "string") {
      searchTerm = input;
    } else {
      input.preventDefault();
      searchTerm = query;
    }

    if (!searchTerm) return;

    setShowEvolution(false);
    setEvolutionChain([]);
    setShowAbilities(false);
    setWeaknesses([]);
    setStrengths([]);
    setLoading(true);

    try {
      const result = await fetchPokemonByName(searchTerm);
      setPokemon(result);
      setQuery(searchTerm); // Update input field to reflect clicked evolution name

      const weaknessData = await fetchPokemonWeaknesses(searchTerm);
      setWeaknesses(weaknessData);

      const strengthData = await fetchPokemonStrengths(searchTerm);
      setStrengths(strengthData);
    } catch {
      setPokemon(null);
      setWeaknesses([]);
      setStrengths([]);
    } finally {
      setLoading(false);
    }
  };

  const closeAllModals = () => {
    setActiveModal("");
  };

  const handleShowEvolution = async () => {
    if (!pokemon) return;

    if (showEvolution) {
      setShowEvolution(false);
      return;
    }
    try {
      const evoChain = await fetchEvolutionChain(pokemon.name);
      setEvolutionChain(evoChain);
      setShowEvolution(true);
    } catch {
      setEvolutionChain([]);
      setShowEvolution(false);
    }
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsLoggedIn(true);
    }
  }, []);

  // 🔵 Sync current user to localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("currentUser");
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  // 🔐 Login handler
  const handleLogin = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const match = users.find(
      (user) =>
        user.email.trim().toLowerCase() === normalizedEmail &&
        user.password === password
    );
    if (match) {
      setCurrentUser(match);
      console.log("Login successful!");
      navigate("/profile");
      closeAllModals(); // if this exists
    } else {
      alert("Incorrect email or password.");
    }
  };

  // 📝 Register handler
  const handleRegister = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const newUser = { name, email: normalizedEmail, password };

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const duplicate = users.find(
      (user) => user.email.trim().toLowerCase() === normalizedEmail
    );

    if (duplicate) {
      alert("A user with this email already exists.");
      return;
    }
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setCurrentUser(newUser);
    console.log("Registration successful!");
    navigate("/profile");
    closeAllModals(); // if this exists
  };

  // ⛳ Example modal triggers
  const handleLoginClick = () => setActiveModal("login");
  const handleSignUpClick = () => setActiveModal("register");

  return (
    <div className="page">
      <div className="page__content page__content_type_profile">
        <Header
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignUpClick}
          onSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  query={query}
                  setQuery={setQuery}
                  pokemon={pokemon}
                  loading={loading}
                  showShiny={showShiny}
                  setShowShiny={setShowShiny}
                  handleSearch={handleSearch}
                  evolutionChain={evolutionChain}
                  showEvolution={showEvolution}
                  handleShowEvolution={handleShowEvolution}
                  showAbilities={showAbilities}
                  setShowAbilities={setShowAbilities}
                  weaknesses={weaknesses}
                  strengths={strengths}
                  pokemonData={pokemonData}
                  species={species}
                  currentIndex={currentIndex}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  pokedexList={pokedexList}
                  handleSave={handleSavePokemon}
                  currentUser={currentUser}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />
          </Routes>

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeAllModals}
            onRegister={handleRegister}
            onLoginClick={handleLoginClick}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeAllModals}
            onLogin={handleLogin}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            onSignupClick={handleSignUpClick}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
