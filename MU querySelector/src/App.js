import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Pages/Home/Home/Home';
import Login from './components/Pages/Authentication/Login/Login';
import DashboardContainer from './components/Pages/Dashboard/DashboardContainer/DashboardContainer';
import ProductListing from './components/Pages/Dashboard/Owner/ProductListing/ProductListing';
import UserProfile from './components/Pages/Dashboard/DashboardShared/UserProfile/UserProfile';
import ProductView from './components/Pages/Shared/ProductView/ProductView';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route index element={<Home />} />
				<Route path='login' element={<Login />} />
				<Route path='product/:id' element={<ProductView />} />
				<Route path='dashboard' element={<DashboardContainer />}>
					<Route index element={<UserProfile />} />
					<Route path='listproduct' element={<ProductListing />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
