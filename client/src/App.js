import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components";
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
    AdminPage

} from "./pages";
import './styles';
import OrderTable from "./components/Admin/OrderTable";
import ProductsTable from "./components/Admin/ProductsTable";
import UsersTable from "./components/Admin/UsersTable";
import TypesTable from "./components/Admin/TypesTable";
import CategoriesTable from "./components/Admin/CategoriesTable";


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
                    <Route path={'/auth'} element={<AuthPage />} />
                    <Route path={'/admin/'} element={<AdminPage />} >
                        <Route path="orders" element={<OrderTable />} />
                        <Route path="products" element={<ProductsTable />} />
                        <Route path="categories" element={<CategoriesTable />} />
                        <Route path="types" element={<TypesTable />} />
                        <Route path="users" element={<UsersTable />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
