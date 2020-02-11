import React from 'react';
import MenuBar from './MenuBar';
import './App.css';
import MenuCarousel from './MenuCarousel';
import OrderInfo from './OrderInfo';
import MenuInfo from './MenuInfo'

function App() {
  return (
    <div>
      <MenuBar></MenuBar>
      <MenuCarousel></MenuCarousel>
      <MenuInfo></MenuInfo>
      <OrderInfo></OrderInfo>
    </div>
  );
}

export default App;
