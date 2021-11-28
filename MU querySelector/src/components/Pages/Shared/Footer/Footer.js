import React from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
	const contactInfo = [
		{ icon: <LocationOnIcon />, info: '451 Wall Street, London, UK' },
		{ icon: <CallIcon />, info: 'Phone: (+084) 333-1233' },
		{ icon: <EmailIcon />, info: 'bestBid@info.com' },
	];

	const helpLinks = [
		{ to: '/', text: 'Terms & Conditions' },
		{ to: '/', text: 'Contact' },
		{ to: '/', text: 'Accessories' },
		{ to: '/', text: 'Term of use' },
	];

	const aboutUsLinks = [
		{ to: '/', text: 'Help Center' },
		{ to: '/', text: 'Address Store' },
		{ to: '/', text: 'Privacy & Policy' },
		{ to: '/', text: 'eyeSide store' },
	];

	const productLinks = [
		{ to: '/', text: 'Orders' },
		{ to: '/', text: 'Downloads' },
		{ to: '/', text: 'How-to Guides' },
		{ to: '/', text: 'Quick Details' },
	];

	return (
		<div className='bg-brand'>
			<div className='container mx-auto grid grid-cols-12 mt-10 p-5 lg:px-0 lg:py-10'>
				<div className='col-span-12 lg:col-span-3 space-y-4 text-center lg:text-left mb-5 lg:mb-0'>
					<h5 className='font-light'>CONTACT US</h5>
					<div className='flex flex-col space-y-2 text-white text-sm items-center lg:items-start'>
						{contactInfo.map(({ icon, info }, index) => (
							<p
								key={index}
								className='flex items-center space-x-2'
							>
								{icon}
								<span>{info}</span>
							</p>
						))}
					</div>
				</div>
				<div className='hidden col-span-6 lg:grid grid-cols-3'>
					<div className='space-y-4'>
						<h5 className='font-light'>HELP & INFORMATION</h5>
						<div className='flex flex-col space-y-2 text-white text-sm'>
							{helpLinks.map(({ to, text }, index) => (
								<Link key={index} to={to}>
									<button className=''>{text}</button>
								</Link>
							))}
						</div>
					</div>
					<div className='space-y-4'>
						<h5 className='font-light'>ABOUT US</h5>
						<div className='flex flex-col space-y-2 text-white text-sm'>
							{aboutUsLinks.map(({ to, text }, index) => (
								<Link key={index} to={to}>
									<button className=''>{text}</button>
								</Link>
							))}
						</div>
					</div>
					<div className='space-y-4'>
						<h5 className='font-light'>PRODUCT</h5>
						<div className='flex flex-col space-y-2 text-white text-sm'>
							{productLinks.map(({ to, text }, index) => (
								<Link key={index} to={to}>
									<button className=''>{text}</button>
								</Link>
							))}
						</div>
					</div>
				</div>
				<div className='col-span-12 lg:col-span-3 space-y-4 text-center lg:text-left'>
					<h5 className='font-light'>GET UPDATES</h5>
					<div className='flex flex-col space-y-2 text-white text-sm'>
						<p>Get bestBid news updates & offers</p>
						<div className='rounded-3xl border flex justify-between overflow-hidden'>
							<input
								className='w-full py-3  outline-none bg-white'
								type='email'
								placeholder='Email address....'
							/>
							<button className='px-2 py-3 bg-black text-white rounded-r-3xl'>
								SUBMIT
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
