import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components";
import {
    CategoryPage,
    DogovirOfertuPage,
    HomePage,
    LoginPage,
    ObminPage,
    OplataDostvkaPage,
    PrivacyPolicyPage,
    ProductPage,
    ShopPage,
    TypePage,
    CheckoutPage,
    AccountPage

} from "./pages";
import './styles';


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
                    <Route path={'/product/:productName'} element={<ProductPage />} />
                    <Route path={'/checkout'} element={<CheckoutPage />} />
                    <Route path={'/oplata-ta-dostavka'} element={<OplataDostvkaPage />} />
                    <Route path={'/obmin-ta-povernennya'} element={<ObminPage />} />
                    <Route path={'/dogovir-oferty'} element={<DogovirOfertuPage />} />
                    <Route path={'/politika-konfidencijnosti'} element={<PrivacyPolicyPage />} />

                    <Route path={'/account'} element={<AccountPage />} />
                    <Route path={'/auth'} element={<LoginPage />} />
                    <Route path={'/admin'} element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
