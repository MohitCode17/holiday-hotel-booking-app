import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AuthLayout from "./Layout/AuthLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/search"
            element={
              <Layout>
                <Search />
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

          {/* Hotels Route */}
          {isLoggedIn && (
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
          )}

          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />

          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />

          <Route
            path="/detail/:hotelId"
            element={
              <Layout>
                <HotelDetails />
              </Layout>
            }
          />

          <Route
            path="/hotel/:hotelId/booking"
            element={
              <Layout>
                <Booking />
              </Layout>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <Layout>
                <MyBookings />
              </Layout>
            }
          />

          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Router>
      {/* React Toastify Container */}
      <ToastContainer />
    </>
  );
};

export default App;
