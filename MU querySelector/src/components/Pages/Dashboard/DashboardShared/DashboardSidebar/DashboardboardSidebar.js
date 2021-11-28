import React from 'react';
import logo from '../../../../../images/brandlogo.png';
import DashboardLink from '../DashboardLink/DashboardLink';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useFirebase from '../../../../../hooks/useFirebase';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import { Avatar } from '@mui/material';

const ownerLinks = [
	{ to: '/', icon: <HomeIcon />, text: 'home' },
	{ to: '/dashboard', icon: <AccountCircleIcon />, text: 'my profile' },
	{ to: 'listproduct', icon: <AddBoxIcon />, text: 'List Products' },
	{ to: 'profile', icon: <BadgeIcon />, text: 'My Products' },
];

const customerLinks = [
	{ to: 'profile', icon: <AccountCircleIcon />, text: 'my profile' },
	{ to: 'profile', icon: <AccountCircleIcon />, text: 'my profile' },
	{ to: 'profile', icon: <AccountCircleIcon />, text: 'my profile' },
	{ to: 'profile', icon: <AccountCircleIcon />, text: 'my profile' },
];

const DashboardSidebar = () => {
	const { handleSignOut } = useFirebase();
	return (
		<div className='p-10 h-full'>
			<div className='flex flex-col justify-between items-start space-y-10'>
				<img className='h-10' src={logo} alt='brand-logo' />
				<div className='w-full flex flex-col justify-center items-center space-y-2'>
					<Avatar />
					<h4>User Name</h4>
				</div>
				<div className='space-y-2 w-full'>
					{ownerLinks.map(({ to, icon, text }, linkIdx) => (
						<DashboardLink
							key={linkIdx}
							to={to}
							icon={icon}
							text={text}
						/>
					))}
				</div>
				<button className='w-full flex space-x-1 p-4 rounded-lg box-shadow items-center border justify-self-end'>
					<LogoutIcon />
					<span>Logout</span>
				</button>
			</div>
		</div>
	);
};

export default DashboardSidebar;
