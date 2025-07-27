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
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for meals by name, ingredient..."
            className="flex-1 pl-10 pr-4 py-2 h-11 rounded-lg bg-background shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50 transition-all"
          />
        </div>
        <Button 
          type="submit" 
          className="h-11 px-6 rounded-lg bg-gradient-to-r from-primary to-amber-600 text-white shadow-md hover:shadow-lg transition-shadow"
          disabled={isSearching || !query.trim()}
        >
          {isSearching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Search
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default SearchBar;