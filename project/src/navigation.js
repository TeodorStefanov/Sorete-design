import React, { useContext } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import Admin from './pages/addProductPage'
import Admin2 from './pages/admin2'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage' 
import Profile from './pages/profile'
import RegisterPage from './pages/RegisterPage'
import ProfileEdit from './pages/profileEdit'
import UserContext from './Context'
import ProductPage from './pages/productPage'
import CartPage from './pages/CartPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/contactPage'
import TowelsPage from './pages/TowelsPage'
import Towels from './pages/TowelsPage/Towels'
import BathRugsAndMats from './pages/TowelsPage/BathRugsAndMats'
import Bathrobes from './pages/TowelsPage/Bathrobes'
import BathAccessories from './pages/TowelsPage/BathAccessories'
import VerifyUser from './pages/verifyUserPage'
import SearchPage from './pages/SearchPage'
import ForgotYourPasswordPage from './pages/forgotYourPasswordPage'
import ChangedPasswordPage from './pages/changedPasswordPage'

const Navigation = () => {
    const {
        loggedIn,
    } = useContext(UserContext)
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/Towels' element={<Towels />} />
                <Route path='/Bath-Rugs-and-Mats' element={<BathRugsAndMats />} />
                <Route path='/Bathrobes' element={<Bathrobes/>} />
                <Route path='/BathAccessories' element={<BathAccessories/>} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/contacts' element={<ContactPage />} />
                <Route path='/login' element={<LoginPage />} />
                {loggedIn ? (<Route path='/add' element={<Admin />} />) : <Route path='/add' element={<Navigate to='/login' />} />}
                {loggedIn ? (<Route path='/add2' element={<Admin2 />} />) : <Route path='/add2' element={<Navigate to='/login' />} />}
                <Route path='/registration' element={<RegisterPage />} />
                {loggedIn ? (<Route path='/profile' element={<Profile />} />) : <Route path='/profile' element={<Navigate to='/login' />} />}
                {loggedIn ? (<Route path='/profile/edit' element={<ProfileEdit />} />) : <Route path='/profile/edit' element={<Navigate to='/login' />} />}
                <Route path='/:products/:id' element={<ProductPage />} />
                <Route path='/:userID/cart' element={<CartPage/>} />
                <Route path='/user/verify/:userId/:uniqueString' element={<VerifyUser/>} />
                <Route path='/searchPage/:searchMenu' element={<SearchPage/>} />
                <Route path='/forgotYourPassword' element={<ForgotYourPasswordPage/>} />
                <Route path='/user/changePassword/:userId/:uniqueString' element={<ChangedPasswordPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation