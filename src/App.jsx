import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home"; // Your page with movie search/list
import MovieDetails from "./Components/MovieDetails"; // The detailed movie view

function App() {
  return (
    <Router>
      <Routes>
        {/* Home/Search Page */}
        <Route path="/" element={<Home />} />
        {/* Movie Details Page by IMDb ID */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

