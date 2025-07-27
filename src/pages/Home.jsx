import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchMeals,
  getRandomMeal,
  getMealsByCategory,
  listCategories,
  getMealsByFirstLetter,
} from "../services/mealApi";
import MealCard from "../components/MealCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import RandomMealButton from "../components/RandomMealButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

function Home() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await listCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const handleShowingMeals = async () => {
    setLoading(true);
    try {
      const letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    const results = await getMealsByFirstLetter(letter);
    setMeals(results);
    } catch (error) {
      setError(
        `Failed to fetch meals by first letter: ${error.message || "Please try again."}`
      )
    } finally {
      setLoading(false);
    }
  }
    fetchCategories();
    handleShowingMeals();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await searchMeals(query);
      setMeals(results);
    } catch (error) {
      setError(
        `Failed to fetch meals: ${error.message || "Please try again."}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category) => {
    setLoading(true);
    try {
      const results = await getMealsByCategory(category);
      setMeals(results);
    } catch (error) {
      setError(
        `Failed to fetch meals by category: ${
          error.message || "Please try again."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRandomMeal = async () => {
    setLoading(true);
    try {
      const meal = await getRandomMeal();
      if (meal) {
        navigate(`/meal/${meal.idMeal}`);
      }
    } catch (error) {
      setError(
        `Failed to fetch random meal.: ${error.message || "Please try again."}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 shadow-lg">
  <CardHeader>
    <CardTitle className="text-2xl font-bold">
      Discover Delicious Meals
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6">
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-end md:justify-between gap-4">
      <div className="flex-1 min-w-0">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="md:w-auto">
        <RandomMealButton onClick={handleRandomMeal} />
      </div>
    </div>

    <div className="mt-6">
      <CategoryFilter
        categories={categories}
        onSelect={handleCategorySelect}
      />
    </div>
  </CardContent>
</Card>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-64 rounded-lg" />
          ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && meals.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              Search for meals by name, ingredient, or select a category
            </p>      
          </CardContent>
        </Card>
      )}

      {!loading && meals.length > 0 && (
     <div> 
    <h2 className="text-lg font-bold text-center mb-4">
      Search for meals by name, ingredient, or select a category
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <MealCard
          key={meal.idMeal}
          meal={meal}
          onClick={() => navigate(`/meal/${meal.idMeal}`)}
        />
      ))}
    </div>
  </div>
)}
    </div>
  );
}

export default Home;
