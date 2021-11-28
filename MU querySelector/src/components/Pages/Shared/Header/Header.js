import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import brandLogo from '../../../../images/brandlogo.png';
import SearchIcon from '@mui/icons-material/Search';
import useFirebase from '../../../../hooks/useFirebase';

const Header = () => {
	const { user, handleSignOut } = useFirebase();

	return (
		<div className='text-dark p-2'>
			<div className='container mx-auto flex justify-between'>
				<Link to='/'>
					<img
						className='object-cover h-10'
						src={brandLogo}
						alt='brand-logo'
					/>
				</Link>
				<div className='space-x-4 flex items-center'>
					<Link to='/'>Home</Link>
					<Link to='/dashboard'>Dashboard</Link>
					{!user ? (
						<Link to='login'>Login</Link>
					) : (
						<button onClick={handleSignOut}>Logout</button>
					)}
					<div className='px-2 flex items-center border rounded-lg'>
						<input
							className='py-2 rounded-lg outline-none w-full'
							type='text'
							placeholder='Search your products...'
						/>
						<SearchIcon sx={{ fontSize: '28px' }} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
