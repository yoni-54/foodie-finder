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
          className="flex items-center gap-2 group"
        >
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <ChefHat className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
            FoodieFinder
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Button 
            asChild 
            variant={activePath === "/" ? "default" : "ghost"} 
            size="sm"
            className="gap-1.5 px-4 rounded-lg"
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant={activePath === "/favorites" ? "default" : "ghost"} 
            size="sm"
            className="gap-1.5 px-4 rounded-lg"
          >
            <Link to="/favorites">
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;