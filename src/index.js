// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import ProductDetail from './ProductDetail';

ReactDOM.render(
	<React.StrictMode>
		<div className="container">
			<header>
				<h1>Kinsta Store</h1>
			</header>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<App />} />
					{/* the new route */}
					<Route path="/product/:id" element={<ProductDetail />} />
				</Routes>
			</BrowserRouter>
		</div>
	</React.StrictMode>,
	document.getElementById('root')
);
