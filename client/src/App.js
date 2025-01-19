import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { MainLayout } from "./components"; 
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    CategoryPage,
    DogovirOfertuPage,
    HomePage,
    AuthPage,
    ObminPage,
    OplataDostvkaPage,
    PrivacyPolicyPage,
    ProductPage,
    ShopPage,
    TypePage,
    CheckoutPage,
    AccountPage,
    AdminPage,
    CompleteOrderPage,
    ForgotPasswordPage,
    SetNewPasswordPage,
    ErrorPage
} from "./pages";
import { CategoriesTable, OrderTable, PrivateRoute, ProductsTable, TypesTable } from "./components/Admin";
import './styles';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path={'/'} element={<HomePage />} />
                    <Route path={'/shop'} element={<ShopPage />} />
                    <Route path={'/:categoryName/'} element={<CategoryPage />} >
                        <Route path={':typeName'} element={<TypePage />} />
                    </Route>
                    <Route path={'/product/:productName'} element={<ProductPage />} />
                    <Route path={'/checkout'} element={<CheckoutPage />} />
                    <Route path={'/order/:orderId'} element={<CompleteOrderPage />} />
                    <Route path={'/oplata-ta-dostavka'} element={<OplataDostvkaPage />} />
                    <Route path={'/obmin-ta-povernennya'} element={<ObminPage />} />
                    <Route path={'/dogovir-oferty'} element={<DogovirOfertuPage />} />
                    <Route path={'/politika-konfidencijnosti'} element={<PrivacyPolicyPage />} />
                    <Route path='/account' element={<AccountPage />} />
                    <Route path='/auth' element={<AuthPage />} />
                    <Route path='/password/forgot' element={<ForgotPasswordPage />} />
                    <Route path='/password/new' element={<SetNewPasswordPage />} />
                    <Route path="/admin" element={<PrivateRoute />} >
                        <Route path='' element={<AdminPage />} >
                            <Route index element={<Navigate to="orders" />} />
                            <Route path="orders" element={<OrderTable />} />
                            <Route path="categories" element={<CategoriesTable />} />
                            <Route path="products" element={<ProductsTable />} />
                            <Route path="types" element={<TypesTable />} />
                        </Route>
                    </Route>
                    <Route path='/error' element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
