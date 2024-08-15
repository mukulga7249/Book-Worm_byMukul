import React, { useState } from 'react';

import 'tailwindcss/tailwind.css';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewBook from './Components/Seller/VIewBook';
import AddBookDetails from './Components/Seller/AddBookDetails';
import Home from "./Pages/Admin/home/Home";
import List from "./Pages/Admin/list/List";
import BuyerList from "./Pages/Admin/list/BuyerList";
import SellerList from "./Pages/Admin/list/SellerList";
import Main from "./Pages/Buyer/Main/Main";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import BookDetail from './Pages/Buyer/BookDetail/BookDetail';
import Cart from './Components/Buyer/cart';

import HomePage from './Pages/Homepage/Homepage';
import ProtectedRoute from "./ProtectedRoutes"
import ApprovedList from './Pages/Admin/list/ApprovedList';
import ShippingForm from './Components/Buyer/ShippingForm';
import OrderSummaryPage from './Components/Buyer/OrderSummaryPage';
import PlacedOrders from './Components/Buyer/PlacedOrders';
import SellerOrder from './Components/Seller/SellerOrder';
import OrderList from './Pages/Admin/list/OrderList';
import UpdateBook from './Components/Seller/UpdateBook';
import WishList from './Pages/Buyer/WishList/WishList';
import PaymentSuccessful from './Components/Buyer/PaymentSuccessful';


function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin/:userType" element={<Signin />} />
          <Route path="/signup/:userType" element={<Signup />} />

          {/* ADMIN ROUTES  */}
          <Route path="/adminHome" element={
            <ProtectedRoute allowedRoles={'admin'}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/adminbuyers" element={
            <ProtectedRoute allowedRoles={'admin'}>
              <BuyerList />
            </ProtectedRoute>
          } />
          <Route path="/adminsellers" element={
            <ProtectedRoute allowedRoles={'admin'}>
              <SellerList />
            </ProtectedRoute>
          } />
          <Route path="/adminlisting" element={
            <ProtectedRoute allowedRoles={'admin'}>
              <List />
            </ProtectedRoute>
          } />
          <Route path="/adminapprovedlisting" element={
            <ProtectedRoute allowedRoles={'admin'}>
              <ApprovedList />
            </ProtectedRoute>
          } />

          <Route path="/adminorders" element={
            <ProtectedRoute allowedRoles={'admin'}>
              <OrderList />
            </ProtectedRoute>
          } />


          {/* Seller Routes */}
          <Route path="/sellerHome" element={
            <ProtectedRoute allowedRoles={'seller'}>
              <ViewBook />
            </ProtectedRoute>
          } />
          <Route path="/update/:id" element={
            <ProtectedRoute allowedRoles={'seller'}>
              <UpdateBook />
            </ProtectedRoute>
          } />
          <Route path="/addbook" element={
            <ProtectedRoute allowedRoles={'seller'}>
              <AddBookDetails />
            </ProtectedRoute>
          } />
          <Route path="/sellerorders" element={
            <ProtectedRoute allowedRoles={'seller'}>
              <SellerOrder />
            </ProtectedRoute>
          } />





          {/* BUYER ROUTES */}
          <Route path="/buyerHome" element={
            <ProtectedRoute allowedRoles={'buyer'}>
              <Main />
            </ProtectedRoute>
          } />

          <Route path="/BookDetails/:id" element={
            <ProtectedRoute allowedRoles={'buyer'}>
              <BookDetail />
            </ProtectedRoute>
          } />

          <Route path="/wishList" element={
            <ProtectedRoute allowedRoles={'buyer'}>
              <WishList />
            </ProtectedRoute>
          } />

          <Route path="/cart/:userId" element={
            <ProtectedRoute allowedRoles={'buyer'}>
              <Cart />
            </ProtectedRoute>
          } />

          <Route path="/getBuyerOrders/:userId" element={
            <ProtectedRoute allowedRoles={'buyer'}>
              <PlacedOrders />
            </ProtectedRoute>
          } />

          <Route path="/checkout/:userid" element={
            <ProtectedRoute allowedRoles={'buyer'}>
              <ShippingForm />
            </ProtectedRoute>
          } />

          <Route path="/order-summary/:id" element={
            <ProtectedRoute allowedRoles={'buyer'}>
              <OrderSummaryPage />
            </ProtectedRoute>
          } />


          <Route path="/checkout/:userid" element={
            <ProtectedRoute allowedRoles={'buyer'}>
              <ShippingForm />
            </ProtectedRoute>
          } />

          <Route path="/order-summary/:id" element={
            <ProtectedRoute allowedRoles={'buyer'}>
              <OrderSummaryPage />
            </ProtectedRoute>
          } />
          <Route path="/payment-success" element={
            <ProtectedRoute allowedRoles={'buyer'}>
              <PaymentSuccessful />
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;