import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteMeals");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (meal) => {
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (mealId) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== mealId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (mealId) => {
    return favorites.some((meal) => meal.idMeal === mealId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
