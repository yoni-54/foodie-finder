import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMealById } from "../services/mealApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Clock, Utensils, Globe, Youtube } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

function MealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

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
        setError("Failed to fetch meal details",err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);


  if (loading) return <div className="container py-8">Loading meal details...</div>;
  if (error) return <Alert variant="destructive">{error}</Alert>;
  if (!meal) return <div className="container py-8">Meal not found</div>;

  const youtubeUrl = meal.strYoutube;
  const youtubeId = youtubeUrl?.split("v=")[1]?.split("&")[0];

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <div className="container py-8 space-y-6 max-w-6xl">
      <Button 
        onClick={() => navigate(-1)} 
        variant="outline" 
        className="gap-2 hover:bg-primary/10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to results
      </Button>

      <Card className="overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/2 relative">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-full max-h-[500px] object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteToggle}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur rounded-full p-2 hover:bg-rose-100"
              aria-label={isFavorite(meal.idMeal) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`h-6 w-6 transition-colors ${
                  isFavorite(meal.idMeal) ? "fill-rose-500 text-rose-600" : "text-gray-400"
                }`}
              />
            </Button>
          </div>

          <div className="md:w-1/2 p-6">
            <CardHeader className="p-0 mb-6">
              <div className="flex justify-between items-start gap-4">
                <CardTitle className="text-3xl font-bold tracking-tight">
                  {meal.strMeal}
                </CardTitle>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="flex items-center gap-1">
                  <Utensils className="h-3 w-3" />
                  {meal.strCategory}
                </Badge>
                <Badge className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {meal.strArea}
                </Badge>
                <Badge className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {Math.floor(Math.random() * 30) + 20} mins
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-amber-500" />
                  Ingredients
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {ingredients.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                      <span className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{item.ingredient}</p>
                        <p className="text-sm text-muted-foreground">{item.measure}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                <div className="prose prose-p:leading-relaxed max-w-none">
                  {meal.strInstructions.split("\n").filter(p => p.trim()).map((paragraph, i) => (
                    <p key={i} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {youtubeId && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-red-500" />
                    Video Recipe
                  </h2>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                    <iframe
                      className="w-full h-64 md:h-80"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={`${meal.strMeal} recipe video`}
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default MealDetail;