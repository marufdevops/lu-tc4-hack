import React from 'react';
import ProductCard from '../../Shared/ProductCard/ProductCard';
import iphone from '../../../../images/iPhone13Pro.png';
import oneplus from '../../../../images/onePlus.png';
import realme from '../../../../images/realme.png';
import redmi from '../../../../images/Redmi.png';
import samsung from '../../../../images/samsung2.png';

const fakeData = [
	{
		id: 1,
		name: 'Iphone 13',
		img: iphone,
		current_bid: '450',
		total_bid: '10',
		bid_ends: '10 Dec, 2021, 5:00PM',
	},
	{
		id: 2,
		name: 'Oneplus',
		img: oneplus,
		current_bid: '470',
		total_bid: '8',
		bid_ends: '25 Dec, 2021, 7:00PM',
	},
	{
		id: 3,
		name: 'Xiaomi Redmi',
		img: redmi,
		current_bid: '495',
		total_bid: '5',
		bid_ends: '28 Dec, 2021, 5:00PM',
	},
	{
		id: 4,
		name: 'Samsung Galaxy',
		img: samsung,
		current_bid: '415',
		total_bid: '1',
		bid_ends: '29 Dec, 2021, 5:00PM',
	},
];

const FeaturedProducts = () => {
	return (
		<div className='py-10 container mx-auto'>
			<h2 className='text-4xl font-bold mb-10'>
				<span className='text-primary'>Featured</span> Products
			</h2>

			<div className='grid grid-cols-4 gap-4'>
				{fakeData.map((product, productIdx) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default FeaturedProducts;
