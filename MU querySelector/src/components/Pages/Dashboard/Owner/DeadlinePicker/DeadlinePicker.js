import React from 'react';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import Stack from '@mui/material/Stack';

const DeadlinePicker = ({ deadline, setDeadline }) => {
	return (
		<LocalizationProvider dateAdapter={DateAdapter}>
			<Stack spacing={3}>
				<MobileDateTimePicker
					value={deadline}
					onChange={(newValue) => {
						setDeadline(newValue);
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
			</Stack>
		</LocalizationProvider>
	);
};

export default DeadlinePicker;
