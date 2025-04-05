import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieRecommendation from "./components/MovieRecommendation";
import PrizePage from "./components/PrizePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MovieRecommendation />} />
                <Route path="/prize" element={<PrizePage />} />
            </Routes>
        </Router>
    );
}

export default App;