import React from 'react';
import { Divider } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { useForm } from 'react-hook-form';

const UserDetailsEdit = ({ handleIsEditing }) => {
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		console.log(data);
		handleIsEditing(false);
	};

	return (
		<div className='col-span-8 flipAnimation box-shadow rounded-lg p-4'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					className='p-2 w-full'
					type='text'
					{...register('firstName')}
					placeholder='John'
				/>
				<Divider />
				<input
					className='p-2 w-full'
					type='text'
					{...register('lastName')}
					placeholder='Smith'
				/>
				<Divider />
				<input
					className='p-2 w-full'
					type='email'
					{...register('email')}
					placeholder='johnsmith@gmail.com'
				/>
				<Divider />
				<input
					className='p-2 w-full'
					type='tel'
					{...register('phone')}
					placeholder='Your phone number'
				/>
				{/* save button */}
				<div className='flex justify-end mt-4'>
					<button
						className='box-shadow rounded-full p-2 bg-brand'
						type='submit'
					>
						<DoneIcon />
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserDetailsEdit;
