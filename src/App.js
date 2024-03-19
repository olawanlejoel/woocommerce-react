import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const CONSUMER_KEY = process.env.REACT_APP_CONSUMER_KEY;
	const CONSUMER_SECRET = process.env.REACT_APP_CONSUMER_SECRET;

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch(
				`${BASE_URL}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
			);
			const data = await response.json();
			setProducts(data);
			setLoading(false);
		};

		fetchProducts();
	}, [BASE_URL, CONSUMER_KEY, CONSUMER_SECRET]);

	return loading ? (
		<div className="loaderText">
			<h2>Just a moment. Fetching products...</h2>{' '}
		</div>
	) : (
		<ul>
			{products ? (
				products.map((product) => (
					<li key={product.id}>
						<Link to={`/product/${product.id}`}>
							<img src={product.images[0].src} alt="Product banner" />
							<h2>{product.name}</h2>
							<p>Sale price: {product.sale_price}</p>
							<strong>
								{product.stock_status === 'instock'
									? 'In stock'
									: 'Out of stock'}
							</strong>
							<button>Add to Cart</button>
						</Link>
					</li>
				))
			) : (
				<li>No products found</li>
			)}
		</ul>
	);
}

export default App;
