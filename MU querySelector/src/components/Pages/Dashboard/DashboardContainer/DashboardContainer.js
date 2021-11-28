import React from 'react';
import DashboardSidebar from '../DashboardShared/DashboardSidebar/DashboardboardSidebar';
import { Outlet } from 'react-router';

const DashboardContainer = () => {
	return (
		<div className='grid grid-cols-12' style={{ minHeight: '100vh' }}>
			<div className='col-span-3 border-r'>
				<DashboardSidebar />
			</div>
			<div className='col-span-9'>
				<div className='h-40 bg-brand flex items-center px-4'>
					<h1 className='text-4xl text-white font-bold'>
						My Dashboard
					</h1>
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardContainer;
