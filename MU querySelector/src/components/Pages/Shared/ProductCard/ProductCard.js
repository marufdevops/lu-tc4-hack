import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
	const { id, name, current_bid, total_bid, img, bid_ends } = product;

	return (
		<div className='box-shadow rounded-lg space-y-4 p-4 text-left flex flex-col justify-between'>
			<img className='object- h-28fit' src={img} alt='product' />
			<div className='space-y-4'>
				<h4 className='font-medium'>{name}</h4>
				<div className='grid grid-cols-2'>
					<div className='space-y-1'>
						<p className='text-gray-400'>Current Bid</p>
						<h4 className='text-xl font-medium'>${current_bid}</h4>
					</div>
					<div className='space-y-1'>
						<p className='text-gray-400'>Total Bids</p>
						<h4 className='text-xl font-medium'>{total_bid}</h4>
					</div>
				</div>
				<div className='p-2 text-center bg-gray-100 rounded-lg'>
					<h4 className='text-red-400'>Bid Ends In</h4>
					<p className='text-sm'>{bid_ends}</p>
				</div>
				<div>
					<Link to={`/product/${id}`}>
						<button className='w-full p-2 bg-brand rounded-lg'>
							View this product
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
