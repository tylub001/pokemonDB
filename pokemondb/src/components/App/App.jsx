import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  const [showMoves, setShowMoves] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [pokedexList, setPokedexList] = useState([]);

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

  const handleLoginClick = () => setActiveModal("login");
  const handleSignUpClick = () => setActiveModal("register");

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
    setIsEditProfileModalOpen(false);
    setIsConfirmModalOpen(false);
    setCardToDelete(null);
  };

  const toggleMoves = () => setShowMoves((prev) => !prev);

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

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .register({ name, avatar, email, password })
      .then((user) => {
        setCurrentUser(user);
        return auth.login({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        closeAllModals();
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
      .login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        fetchUserProfile(data.token);
        setPasswordError("");
        closeAllModals();
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setPasswordError("Incorrect password");
      });
  };

  return (
    <div className="page">
      <div className="page__content page__content_type_profile">
        <Header
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignUpClick}
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
                  showMoves={showMoves}
                  setShowMoves={setShowMoves}
                  evolutionChain={evolutionChain}
                  showEvolution={showEvolution}
                  handleShowEvolution={handleShowEvolution}
                  showAbilities={showAbilities}
                  setShowAbilities={setShowAbilities}
                  weaknesses={weaknesses}
                  strengths={strengths}
                  pokemonData={pokemonData}
                  species={species}
                  toggleMoves={toggleMoves}
                  currentIndex={currentIndex}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  pokedexList={pokedexList}
                />
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<Login />} />
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
