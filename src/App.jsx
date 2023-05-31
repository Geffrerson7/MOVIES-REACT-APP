import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import MovieDetail from "./pages/movieDetail/MovieDetail";
import MoviesList from "./components/moviesList/moviesList";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/header/Header";
import FavoriteMovie from "./pages/favoriteMovie/FavoriteMovie";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const authTokens = localStorage.getItem("authTokens");

  return (
    <div className="App">
      <Router>
        {authTokens && <Header />}
        <Routes>
          <Route
            path="movie/:id"
            element={
              <ProtectedRoute isAllowed={authTokens}>
                <MovieDetail />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            index
            element={
              <ProtectedRoute isAllowed={authTokens}>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="movies/:type"
            element={
              <ProtectedRoute isAllowed={authTokens}>
                <MoviesList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="movies/favorite"
            element={
              <ProtectedRoute isAllowed={authTokens}>
                <FavoriteMovie />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
