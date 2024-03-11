// ProductDetail.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const CONSUMER_KEY = process.env.REACT_APP_CONSUMER_KEY;
	const CONSUMER_SECRET = process.env.REACT_APP_CONSUMER_SECRET;

	const { id } = useParams();
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchSingleProductDetails = async () => {
			const response = await fetch(
				`${BASE_URL}/${id}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
			);
			const data = await response.json();
			setProduct(data);
		};
		fetchSingleProductDetails();
	}, [BASE_URL, CONSUMER_KEY, CONSUMER_SECRET, id]);

	if (!product) {
		return (
			<div className="loaderText">
				<h2>Fetching product details...</h2>
			</div>
		);
	}

	return (
		<div className="product-detail">
			<h2>{product.name}</h2>
			<div dangerouslySetInnerHTML={{ __html: product.description }} />
			<h4>Original Price: {product.regular_price}</h4>
			<h4>Sale price: {product.sale_price}</h4>
			<div dangerouslySetInnerHTML={{ __html: product.short_description }} />
			<strong>
				{product.stock_status === 'instock' ? 'In stock' : 'Out of stock'}
			</strong>
		</div>
	);
}

export default ProductDetail;
