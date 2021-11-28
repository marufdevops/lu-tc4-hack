import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import Banner from '../Banner/Banner';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';

const Home = () => {
	return (
		<div className='h-screen'>
			<Header />
			<Banner />
			<FeaturedProducts />
			<Footer />
		</div>
	);
};

export default Home;
