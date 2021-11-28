import { useState, useEffect } from 'react';
import {
	getAuth,
	signInWithPopup,
	onAuthStateChanged,
	updateProfile,
	getIdToken,
	RecaptchaVerifier,
	getCodeFromUserInput,
	signInWithPhoneNumber,
	signOut,
} from 'firebase/auth';
import initializeAuthentication from '../components/Pages/Authentication/firebase/firebase.init';
import { useNavigate } from 'react-router';

initializeAuthentication();

const useFirebase = () => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const auth = getAuth();
	auth.languageCode = 'it';

	// register user
	const setupRecaptcha = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			'recaptcha-container',
			{
				size: 'invisible',
				callback: (response) => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
					handleSignInWithPhoneNumber();
				},
			},
			auth
		);
	};

	const handleSignInWithPhoneNumber = (phoneNumber) => {
		setIsLoading(true);
		setupRecaptcha();
		const appVerifier = window.recaptchaVerifier;

		signInWithPhoneNumber(auth, phoneNumber, appVerifier)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				const code = window.prompt('Enter OTP');
				confirmationResult
					.confirm(code)
					.then((result) => {
						// User signed in successfully.
						const user = result.user;
						console.log(user);
						navigate('/');
						// ...
					})
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				// Error; SMS not sent
				// ...
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	// handling auth state change
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
			setIsLoading(false);
		});

		return () => unsubscribe;
	}, [auth]);

	// signout user
	const handleSignOut = () => {
		setIsLoading(true);
		signOut(auth)
			.then(() => {
				setError('');
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return {
		user,
		error,
		setError,
		isLoading,
		handleSignInWithPhoneNumber,
		handleSignOut,
	};
};

export default useFirebase;
