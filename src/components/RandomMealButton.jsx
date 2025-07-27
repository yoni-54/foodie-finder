import { Button } from "@/components/ui/button";
import { Dice1 } from "lucide-react";

function RandomMealButton({ onClick }) {
  return (
    <Button className="h-11 bg-gradient-to-r from-purple-500 to-pink-600"onClick={onClick} variant="outline">
      <Dice1 className="h-4 w-4 mr-2" />
      Surprise Me!
    </Button>
  );
}

export default RandomMealButton;
