import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MealDetail from "./pages/MealDetail";
import Header from "./components/Header";
import "./App.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-sm rounded-xl p-6">
              <Routes>
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/" element={<Home />} />
                <Route path="/meal/:id" element={<MealDetail />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
