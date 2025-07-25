import axios from "axios";

const API_BASE = "https://www.themealdb.com/api/json/v1/1/";

export const searchMeals = async (query) => {
  try {
    const response = await axios.get(`${API_BASE}search.php?s=${query}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Error searching meals:", error);
    return [];
  }
};

export const getMealById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    return null;
  }
};

export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${API_BASE}random.php`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching random meal:", error);
    return null;
  }
};

export const getMealsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE}filter.php?c=${category}`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    return [];
  }
};

export const listCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE}list.php?c=list`);
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
