import React, { useState } from 'react';
import useFirebase from '../../../../hooks/useFirebase';
import { useForm } from 'react-hook-form';
import loginAnimation from '../../../../images/loginAnimation.svg';

const Login = () => {
	const [isRegister, setIsRegister] = useState(false);
	const { handleSignInWithPhoneNumber, isLoading } = useFirebase();
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		handleSignInWithPhoneNumber(data.phone);
		console.log(data);
	};

	return (
		<div className='flex justify-center items-center'>
			<div
				className='bg-white w-full rounded-lg'
				style={{ maxWidth: '500px' }}
			>
				<h2 className=' uppercase text-2xl lead-1'>
					Please Register yourself
				</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div id='recaptcha-container' />

					{/* form */}
					<div className='flex flex-col space-y-4 p-4'>
						{isRegister && (
							<>
								{/* first name */}
								<div className='space-y-2'>
									<h4 className='uppercase font-light text-left'>
										First Name
									</h4>
									<input
										className='p-2 rounded-lg border w-full'
										type='text'
										{...register('firstName')}
										placeholder='John'
									/>
								</div>

								{/* last name */}
								<div className='space-y-2'>
									<h4 className='uppercase font-light text-left'>
										Last Name
									</h4>
									<input
										className='p-2 rounded-lg border w-full'
										type='text'
										{...register('lastName')}
										placeholder='Smith'
									/>
								</div>

								{/* user type */}
								<div className='space-y-2'>
									<h4 className='uppercase font-light text-left'>
										Buyer or Seller?
									</h4>
									<select
										className='p-2 rounded-lg border w-full'
										{...register('user_type')}
									>
										<option value='seller'>seller</option>
										<option value='buyer'>buyer</option>
									</select>
								</div>
							</>
						)}

						{/* Phone number */}
						<div className='space-y-2'>
							<h4 className='uppercase font-light text-left'>
								Your phone number
							</h4>
							<input
								className='p-2 rounded-lg border w-full'
								type='tel'
								{...register('phone')}
								placeholder='Your phone number'
							/>
						</div>
						<button
							className='p-2 bg-brand rounded-lg border w-full'
							type='submit'
							disabled={isLoading}
						>
							{isRegister
								? `${isLoading ? 'Registering' : 'Register'}`
								: `${isLoading ? 'Logging In' : 'Log In'}`}
						</button>
					</div>
				</form>
				{isRegister ? (
					<p>
						Existing User?{' '}
						<button onClick={() => setIsRegister(false)}>
							<span className='text-brand'>Please Login</span>
						</button>
					</p>
				) : (
					<p>
						New User?{' '}
						<button onClick={() => setIsRegister(true)}>
							<span className='text-brand'>Please Register</span>
						</button>
					</p>
				)}
			</div>

			<img
				className='object-cover w-6/12'
				src={loginAnimation}
				alt='login'
			/>
		</div>
	);
};

export default Login;
