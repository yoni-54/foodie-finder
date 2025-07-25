import { Button } from "@/components/ui/button";
import { Dice1 } from "lucide-react";

function RandomMealButton({ onClick }) {
  return (
    <Button onClick={onClick} variant="outline">
      <Dice1 className="h-4 w-4 mr-2" />
      Surprise Me!
    </Button>
  );
}

export default RandomMealButton;
