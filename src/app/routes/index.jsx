import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { ShopListPage } from '../../pages/shop-list';
import { ShopDetailPage } from '../../pages/shop-detail';
import { ScrollToTop } from './ScrollToTop';

export const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shops" element={<ShopListPage />} />
        <Route path="/shops/:id" element={<ShopDetailPage />} />
      </Routes>
    </>
  );
};
