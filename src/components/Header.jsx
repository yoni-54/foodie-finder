import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Heart, Utensils, Search, ChefHat } from "lucide-react";

function Header() {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 dark:bg-gray-950/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-gray-950/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link 
          to="/" 
          className="flex items-center gap-1 group sm:gap-2"
        >
          <div className="p-1 sm:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <ChefHat className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
            FoodieFinder
          </span>
        </Link>
        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Button 
            asChild 
            variant={activePath === "/" ? "default" : "ghost"} 
            size="sm"
            className="gap-1 px-3 sm:px-4 rounded-lg"
          >
            <Link to="/" className="flex items-center">
              <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant={activePath === "/favorites" ? "default" : "ghost"} 
            size="sm"
            className="gap-1 px-3 sm:px-4 rounded-lg"
          >
            <Link to="/favorites" className="flex items-center">
              <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="sr-only sm:not-sr-only">Favorites</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;