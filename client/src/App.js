import './styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Bonus, Wishlist, MainLayout } from "./components";
import {
    AccountPage,
    CartPage, CategoryPage,
    DogovirOfertuPage,
    HomePage,
    LoginPage,
    ObminPage,
    OplataDostvkaPage, PrivacyPolicyPage,
    ProductPage,
    ShopPage,
    TypePage
} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />} >
                    <Route path={'/'} element={<HomePage />} />
                    <Route path={'/shop'} element={<ShopPage />} />
                    <Route path={'/:categoryName'} element={<CategoryPage />} >
                        <Route path={':typeName'} element={<TypePage />} />
                    </Route>

                    <Route path={'/product/:productId'} element={<ProductPage />} />

                    <Route path={'/login'} element={<LoginPage />} />

                    <Route path={'/account'} element={<AccountPage />}>
                        <Route path={'wishlist'} element={<Wishlist />} />
                        <Route path={'bonus'} element={<Bonus />} />
                    </Route>

                    <Route path={'/cart'} element={<CartPage />} />
                    <Route path={'/checkout'} element={<HomePage />} />

                    <Route path={'/admin'} element={<HomePage />} />

                    <Route path={'/oplata-ta-dostavka'} element={<OplataDostvkaPage />} />
                    <Route path={'/obmin-ta-povernennya'} element={<ObminPage />} />
                    <Route path={'/dogovir-oferty'} element={<DogovirOfertuPage />} />
                    <Route path={'/politika-konfidencijnosti'} element={<PrivacyPolicyPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
