import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Pages & Components
import Navbar from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import PorductList from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Signup from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import ChatBox from "./components/ChatBox/ChatBox"
import ProductHome from "./pages/ProductHome/ProductHome"
import ChatBot from "./pages/ChatBot/Chatbot";
import MapView from "./pages/MapView/MapView"
import Seller from "./pages/Seller/Seller";
import StuedntSeller from "./pages/StudentSeller/StudentSeller";

// Cart Context
import { CartProvider } from "./pages/CartContext/CartContext";
// import Profile from "./pages/Profile";
// import CreateListing from "./pages/CreateListing";
// import ListingDetails from "./pages/ListingDetails";
// import Marketplace from "./pages/Marketplace";
// import Chat from "./pages/Chat";
// import AdminDashboard from "./pages/AdminDashboard";
// import MapMeetup from "./pages/MapMeetup";
// Component to conditionally show Navbar/Footer
function AppContent() {
  const location = useLocation();
  const hideNavFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavFooter && <Navbar />}
      {!hideNavFooter && <ChatBox />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<PorductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/producthome" element={<ProductHome />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/mapviwe" element={<MapView />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/studentseller" element={<StuedntSeller />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/create-listing" element={<CreateListing />} /> */}
        {/* <Route path="/listing/:id" element={<ListingDetails />} /> */}
        {/* <Route path="/marketplace" element={<Marketplace />} /> */}
        {/* <Route path="/chat" element={<Chat />} /> */}
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        {/* <Route path="/map-meetup" element={<MapMeetup />} /> */}
      </Routes>
      {!hideNavFooter && <Footer />}
      {/* <ChatBox /> */}

    </>
  );
}

// ✅ Main App wrapped with CartProvider
function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
