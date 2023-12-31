import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyExpert from "./pages/ApplyExpert";
import Notifications from "./pages/Notifications";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      <BrowserRouter>
        {loading && (
          <div className="spinner-parent">
            <div class="spinner-border" role="status"></div>
          </div>
        )}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/apply-expert" element={<ProtectedRoute><ApplyExpert/></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
