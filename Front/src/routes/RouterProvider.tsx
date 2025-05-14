// filepath: [RouterProvider.tsx](http://_vscodecontentref_/5)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import TestAPI from "../pages/Test/api";
import Register from "../pages/Register";
import Login from "../pages/Login";
import User from "../pages/User";
import ProtectedRoute from "./ProtectedRoute";

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test-api" element={<TestAPI />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;