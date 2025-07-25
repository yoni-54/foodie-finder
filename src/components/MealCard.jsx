import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
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
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer h-full relative"
      onClick={onClick}
    >
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 z-10 p-2 bg-background/80 backdrop-blur rounded-full"
        aria-label={
          isFavorite(meal.idMeal) ? "Remove from favorites" : "Add to favorites"
        }
      >
        <Heart
          className={`h-5 w-5 ${
            isFavorite(meal.idMeal)
              ? "fill-primary text-primary"
              : "text-muted-foreground"
          }`}
        />
      </button>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <CardHeader>
        <CardTitle className="text-lg">{meal.strMeal}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{meal.strCategory}</span>
          <span>{meal.strArea}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default MealCard;
