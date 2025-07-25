import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealById } from "../services/mealApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";

function MealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const mealData = await getMealById(id);
        if (!mealData) {
          setError("Meal not found");
          return;
        }
        setMeal(mealData);
      } catch (err) {
        setError("Failed to fetch meal details");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading)
    return <div className="container py-8">Loading meal details...</div>;
  if (error) return <Alert variant="destructive">{error}</Alert>;
  if (!meal) return <div className="container py-8">Meal not found</div>;

  const youtubeUrl = meal.strYoutube;
  const youtubeId = youtubeUrl?.split("v=")[1]?.split("&")[0];

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  const handleFavoriteToggle = () => {
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <div className="container py-8 space-y-6">
      <Button onClick={() => navigate(-1)} variant="outline" className="gap-1">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <Card>
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
            />
          </div>
          <div className="md:w-1/2">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl">{meal.strMeal}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFavoriteToggle}
                  aria-label={
                    isFavorite(meal.idMeal)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite(meal.idMeal) ? "fill-primary text-primary" : ""
                    }`}
                  />
                </Button>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">{meal.strCategory}</Badge>
                <Badge variant="secondary">{meal.strArea}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {ingredients.map((ing, index) => (
                      <li key={index} className="text-sm">
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Instructions</h2>
                  <div className="prose max-w-none">
                    {meal.strInstructions.split("\n").map((paragraph, i) => (
                      <p key={i} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {youtubeId && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Video Recipe</h2>
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        className="w-full h-64 md:h-96 rounded-lg"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title={`${meal.strMeal} recipe video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MealDetail;
