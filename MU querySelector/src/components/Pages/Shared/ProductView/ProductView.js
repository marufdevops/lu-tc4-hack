import React from 'react';
import { useParams } from 'react-router';
import productImg from '../../.../../../../images/iPhone13Pro.png';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const ProductView = () => {
	const { id } = useParams();
	return (
		<div className='container mx-auto space-y-10'>
			<Header />
			<div className='grid grid-cols-2'>
				<div className=''>
					<img src={productImg} alt='productImg' />
				</div>
				<div className='mt-10 text-left space-y-4'>
					<h4 className='text-4xl'>Iphone 13 Pro</h4>
					<div className='bg-gray-100 rounded-lg p-4 space-y-2'>
						{/* current price */}
						<div className='flex justify-between items-center'>
							<h4 className='text-xl font-medium'>
								Current Price
							</h4>
							<h1 className='text-4xl font-bold'>$700.00</h1>
						</div>
						{/* total bidders */}
						<div className='flex justify-between items-center'>
							<h4 className='text-lg font-medium'>
								Total Bidders
							</h4>
							<h1 className='text-xl font-bold'>40</h1>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ProductView;
