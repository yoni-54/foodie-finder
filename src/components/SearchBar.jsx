import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      await onSearch(query);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for meals by name, ingredient..."
            className="w-full pl-10 pr-4 py-2 h-12 text-base rounded-lg bg-background shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50 transition-all"
          />
        </div>

        <Button 
          type="submit" 
          className="h-12 px-6 sm:w-auto w-full rounded-lg bg-gradient-to-r from-primary to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          disabled={isSearching || !query.trim()}
        >
          {isSearching ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              <span className="text-sm sm:text-base">Search</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}

export default SearchBar;