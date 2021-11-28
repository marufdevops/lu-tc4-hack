import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import UserDetails from './UserDetails';
import UserDetailsEdit from './UserDetailsEdit';

const UserProfile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [isPhotoEditing, setIsPhotoEditing] = useState(false);

	const handlePhotoChange = (e) => {
		e.preventDefault();
	};

	const handleIsEditing = (bool) => {
		setIsEditing(bool);
	};

	return (
		<div className='p-4'>
			<div className='grid grid-cols-12 gap-4 relative'>
				<div className='col-span-4 box-shadow rounded-lg flex flex-col justify-center items-center space-y-2'>
					<img
						className='rounded-full w-40'
						src='https://image.shutterstock.com/image-illustration/user-client-utilizer-glyph-icon-260nw-1174611454.jpg'
						alt=''
					/>

					<div
						className={`box-shadow p-2 ${
							isPhotoEditing
								? ' w-full rounded-lg'
								: ' rounded-full'
						}`}
					>
						{!isPhotoEditing ? (
							<button onClick={() => setIsPhotoEditing(true)}>
								<EditIcon />
							</button>
						) : (
							<input
								onChange={(e) => handlePhotoChange(e)}
								type='file'
							/>
						)}
					</div>
				</div>
				{!isEditing ? (
					<UserDetails handleIsEditing={handleIsEditing} />
				) : (
					<UserDetailsEdit handleIsEditing={handleIsEditing} />
				)}
			</div>
		</div>
	);
};

export default UserProfile;
