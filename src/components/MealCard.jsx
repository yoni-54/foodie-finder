import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Clock, Utensils, MapPin, Star } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

function MealCard({ meal, onClick }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  return (
    <Card className="relative hover:shadow-xl transition-all duration-300 cursor-pointer h-full border-0 shadow-sm overflow-hidden group" onClick={onClick}>
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
        aria-label={isFavorite(meal.idMeal) ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isFavorite(meal.idMeal)
              ? "fill-rose-500 text-rose-600"
              : "text-gray-400 hover:text-rose-400"
          }`}
        />
      </button>
      <div className="relative overflow-hidden aspect-video">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{meal.strMeal}</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Utensils className="h-4 w-4 text-amber-500" />
            <span>{meal.strCategory}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span>{meal.strArea} Cuisine</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-emerald-500" />
            <span>{Math.floor(Math.random() * 30) + 20} mins</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MealCard;