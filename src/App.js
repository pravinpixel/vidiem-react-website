import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoutes from 'layouts/ProtectedRoutes';
import AOS from 'aos';
import MainLayout from './layouts/MainLayout';
const Home = lazy(() => import('./pages/home'))
const Checkout = lazy(() => import('./pages/checkout'))
const Customize = lazy(() => import('./pages/customize'))
const NotFound = lazy(() => import('./pages/not-found'))
const MyProfile = lazy(() => import('./pages/my-profile'))
const MyOrders = lazy(() => import('./pages/my-orders'))
const MyCustomizations = lazy(() => import('./pages/my-customizations'))

function App() {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <Suspense>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/">
                        <Route index element={<Navigate to="/home" replace />} />
                        <Route path='/home' element={<Home />}></Route>
                        <Route path='/customize/:step' element={<Customize />}></Route>
                        <Route path='/checkout/:slug' element={<Checkout />}></Route>
                        <Route element={<ProtectedRoutes />}>
                            <Route path='/my-profile' element={<MyProfile />}></Route>
                            <Route path='/my-orders' element={<MyOrders />}></Route>
                            <Route path='/my-customizations' element={<MyCustomizations />}></Route>
                        </Route>
                    </Route>
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default App;
