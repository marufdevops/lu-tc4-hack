import React from 'react';
import bannerImg from '../../../../images/bannerlogo.svg';

const Banner = () => {
	return (
		<div className='bg-white'>
			<div
				className='container mx-auto grid grid-cols-2 place-items-center'
				style={{ minHeight: 'calc(100vh - 58px)' }}
			>
				<div className='text-left space-y-4'>
					<h4 className='text-brand text-xl capitalize'>
						we provide the best
					</h4>
					<h1 className='uppercase text-5xl font-bold'>
						Bid your best
					</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Corrupti, voluptatum?
					</p>
					<button className='bg-brand px-4 py-2 rounded-lg font-bold text-xl'>
						Get started
					</button>
				</div>
				<img
					className='inline-block object-cover'
					src={bannerImg}
					alt='bannerImage'
				/>
			</div>
		</div>
	);
};

export default Banner;
