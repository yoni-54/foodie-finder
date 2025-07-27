import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import MealCard from "../components/MealCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartOff } from "lucide-react";

function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="container py-8 space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Favorite Meals</CardTitle>
      </CardHeader>

      {favorites.length === 0 ? (
        <Card>
          <CardContent className="py-12 flex flex-col items-center justify-center text-center">
            <HeartOff className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">
              You haven't saved any favorites yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((meal) => (
            <MealCard
              key={meal.idMeal}
              meal={meal}
              onClick={() => navigate(`/meal/${meal.idMeal}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
