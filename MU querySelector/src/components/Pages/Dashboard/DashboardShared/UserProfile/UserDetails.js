import React from 'react';
import { Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const UserDetails = ({ handleIsEditing }) => {
	return (
		<div className='flipAnimation col-span-8 box-shadow rounded-lg p-4'>
			<div className='flex justify-between items-center p-2'>
				<h4 className='font-medium'>First Name</h4>
				<p>John</p>
			</div>
			<Divider />
			<div className='flex justify-between items-center p-2'>
				<h4 className='font-medium'>First Name</h4>
				<p>Smith</p>
			</div>
			<Divider />
			<div className='flex justify-between items-center p-2'>
				<h4 className='font-medium'>Email</h4>
				<p>johnsmith@gmail.com</p>
			</div>
			<Divider />
			<div className='flex justify-between items-center p-2'>
				<h4 className='font-medium'>Phone Number</h4>
				<p>+88017######</p>
			</div>
			{/* edit button */}
			<div className='flex justify-end mt-4'>
				<button
					onClick={() => handleIsEditing(true)}
					className='box-shadow rounded-full p-2'
				>
					<EditIcon />
				</button>
			</div>
		</div>
	);
};

export default UserDetails;
