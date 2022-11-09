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
import ItemPage from './pages/ItemPage'
import CartPage from './pages/CartPage'
import AboutPage from './pages/AboutPage'

const Navigation = () => {
    const {
        loggedIn,
    } = useContext(UserContext)
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/login' element={<LoginPage />} />
                {loggedIn ? (<Route path='/add' element={<Admin />} />) : <Route path='/add' element={<Navigate to='/login' />} />}
                {loggedIn ? (<Route path='/add2' element={<Admin2 />} />) : <Route path='/add2' element={<Navigate to='/login' />} />}
                <Route path='/registration' element={<RegisterPage />} />
                {loggedIn ? (<Route path='/profile' element={<Profile />} />) : <Route path='/profile' element={<Navigate to='/login' />} />}
                {loggedIn ? (<Route path='/profile/edit' element={<ProfileEdit />} />) : <Route path='/profile/edit' element={<Navigate to='/login' />} />}
                <Route path='/items/:id' element={<ItemPage />} />
                <Route path='/cart' element={<CartPage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation