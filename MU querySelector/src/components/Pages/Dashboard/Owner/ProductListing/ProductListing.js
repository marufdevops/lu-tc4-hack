import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DeadlinePicker from '../DeadlinePicker/DeadlinePicker';

const ProductListing = () => {
	const { register, handleSubmit } = useForm();
	const [deadline, setDeadline] = useState(new Date());
	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className='p-4'>
			<div className='box-shadow rounded-lg'>
				<form className='p-4' onSubmit={handleSubmit(onSubmit)}>
					<div className='grid grid-cols-2 gap-4'>
						{/* name */}
						<div className='flex flex-col space-y-2'>
							<h4 className='font-light uppercase text-left'>
								product name
							</h4>
							<input
								className='p-4 border rounded-lg focus-within:border-brand outline-none'
								{...register('product_name', {
									required: true,
								})}
							/>
						</div>
						{/* brand */}
						<div className='flex flex-col space-y-2'>
							<h4 className='font-light uppercase text-left'>
								product brand
							</h4>
							<select
								className='p-4 border rounded-lg focus-within:border-brand outline-none'
								{...register('product_brand', {
									required: true,
								})}
							>
								<option value='samsung'>samsung</option>
								<option value='apple'>apple</option>
								<option value='realme'>realme</option>
								<option value='oneplus'>oneplus</option>
								<option value='xiaomi'>xiaomi</option>
							</select>
						</div>
						{/* lowest bid */}
						<div className='flex flex-col space-y-2'>
							<h4 className='font-light uppercase text-left'>
								lowest bid price
							</h4>
							<input
								type='number'
								className='p-4 border rounded-lg focus-within:border-brand outline-none'
								{...register('lowest_bid', { required: true })}
							/>
						</div>
						{/* picture */}
						<div className='flex flex-col space-y-2'>
							<h4 className='font-light uppercase text-left'>
								product image
							</h4>
							<input
								type='file'
								className='p-4 border rounded-lg focus-within:border-brand outline-none'
								{...register('product_picture', {
									required: true,
								})}
							/>
						</div>
						<div className='flex flex-col space-y-2'>
							<h4 className='font-light uppercase text-left'>
								product condition
							</h4>
							<select
								className='p-4 border rounded-lg focus-within:border-brand outline-none'
								{...register('condition', { required: true })}
							>
								<option value='new'>new</option>
								<option value='old'>old</option>
							</select>
						</div>
						{/* picture */}
						<div className='flex flex-col space-y-2'>
							<h4 className='font-light uppercase text-left'>
								Bidding Deadline
							</h4>
							<DeadlinePicker
								deadline={deadline}
								setDeadline={setDeadline}
							/>
						</div>
					</div>
					<input
						className='w-full py-4 border rounded-lg focus-within:border-brand outline-none mt-4 bg-brand transition transform duration-100 cursor-pointer'
						type='submit'
					/>
				</form>
			</div>
		</div>
	);
};

export default ProductListing;
