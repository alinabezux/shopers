import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Bonus, Footer, Header, Wishlist} from "./components";
import {AccountPage, CartPage, HomePage, LoginPage, ProductPage, ShopPage} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/shop'} element={<ShopPage/>}/>
                <Route path={'/product/:productId'} element={<ProductPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/account/'} element={<AccountPage/>}>
                    <Route path={'wishlist'} element={<Wishlist/>}/>
                    <Route path={'bonus'} element={<Bonus/>}/>
                </Route>
                <Route path={'/cart'} element={<CartPage/>}/>
                <Route path={'/checkout'} element={<HomePage/>}/>
                <Route path={'/admin'} element={<HomePage/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
