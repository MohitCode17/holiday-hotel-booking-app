import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AuthLayout from "./Layout/AuthLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <p>Home Page</p>
              </Layout>
            }
          />

          <Route
            path="/sign-in"
            element={
              <AuthLayout>
                <SignIn />
              </AuthLayout>
            }
          />

          <Route
            path="/sign-up"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
        </Routes>
      </Router>
      {/* React Toastify Container */}
      <ToastContainer />
    </>
  );
};

export default App;
