import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import About from '../pages/About';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from '../components/Registration/ActivateAccount';
import DashboardLayout from '../layouts/DashboardLayout';
import Profile from '../pages/Profile';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import AddProduct from '../pages/AddProduct';
import AddCategory from '../pages/AddCategory';
import Orders from '../pages/Orders';
import Deposit from '../pages/Deposit';
import PaymentSuccess from '../pages/PaymentSuccess';
import Categories from '../pages/Categories';
import EditProduct from '../pages/EditProduct';
import UsersPage from '../pages/UserPage';


const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="activate/:uid/:token" element={<ActivateAccount />} />
                <Route path="login" element={<Login />} />
                <Route path="shop" element={<Shop />} />
                <Route path="categories" element={<Categories />} />
                <Route path="shop/:productId" element={<ProductDetail />} />
                <Route path="about" element={<About />} />
            </Route>

            <Route path="dashboard" 
                element={
                    <PrivateRoute>
                        <DashboardLayout />
                    </PrivateRoute>
                }
                >
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="cart" element={<Cart />} />
                <Route path="orders" element={<Orders />} />
                <Route path="payment/success/" element={<PaymentSuccess />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path="products/edit/:productId" element={<EditProduct />} />
                <Route path="categories/add" element={<AddCategory />} />
                <Route path="deposit" element={<Deposit />} />
                <Route path="users" element={<UsersPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;