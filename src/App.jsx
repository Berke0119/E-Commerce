import PageContent from "./layout/PageContent";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
//import ProductDetail from "./pages/ProductDetail"; 

function App() {
  return (
    <PageContent>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId"
          element={<ShopPage />}
        />
        {/*<Route
          path="/shop/:gender/:categoryName/:categoryId/:productId"
          element={<ProductDetail />}
        />*/}
      </Routes>
    </PageContent>
  );
}

export default App;
