import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardLink = ({ icon, to, text }) => {
	return (
		<NavLink
			className={({ isActive }) =>
				'flex space-x-2 p-4 rounded-lg box-shadow items-center border capitalize hover:bg-brand hover:text-white transition duration-100' +
				(isActive ? 'border-brand' : '')
			}
			to={to}
		>
			{icon}
			<span>{text}</span>
		</NavLink>
	);
};

export default DashboardLink;
