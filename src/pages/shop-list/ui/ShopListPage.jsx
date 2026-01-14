import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '@entities/category/data/categories';
import { CategoryTab } from '@entities/category/ui/CategoryTab';
import { ShopListView } from '@widgets/shop-list-view';
import { fetchShops } from '@entities/shop/api/shopApi';
import { Card, Grid, Button } from '@shared/ui';
import { Spinner } from '@shared/ui/Spinner';

const ALL_CATEGORY = '전체';

const ShopListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [shops, setShops] = useState([]);
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromQuery = params.get('c');

    if (categoryFromQuery) {
      setActiveCategory(categoryFromQuery);
    } else {
      setActiveCategory(ALL_CATEGORY);
    }
  }, [location.search]);

  useEffect(() => {
    setIsLoading(true);
    fetchShops()
      .then(data => {
        setShops(data);
        setError('');
      })
      .catch(() => {
        setError('가게 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredShops = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) {
      return shops;
    }
    return shops.filter(shop => shop.category === activeCategory);
  }, [shops, activeCategory]);

  const handleCategoryChange = categoryValue => {
    setActiveCategory(categoryValue);
    const params = new URLSearchParams();
    if (categoryValue !== ALL_CATEGORY) {
      params.set('c', categoryValue);
    }
    const query = params.toString();
    navigate(`/shops${query ? `?${query}` : ''}`, { replace: true });
  };

  const handleSelectShop = shop => {
    navigate(`/shops/${shop.id}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f4fb' }}>
      <main
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '48px 24px 80px',
          display: 'grid',
          gap: '32px',
        }}
      >
        <Card variant="default" padding="20px">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[ALL_CATEGORY, ...CATEGORIES.map(category => category.value)].map(
              categoryValue => (
                <CategoryTab
                  key={categoryValue}
                  label={categoryValue}
                  isActive={activeCategory === categoryValue}
                  onClick={() => handleCategoryChange(categoryValue)}
                />
              )
            )}
          </div>
        </Card>

        {error && (
          <Card variant="default" padding="20px">
            <p
              style={{
                margin: 0,
                color: '#c62828',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {error}
            </p>
          </Card>
        )}

        <Card padding="0">
          {isLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '60px 0',
              }}
            >
              <Spinner showMessage={false} />
            </div>
          ) : (
            <ShopListView
              shops={filteredShops}
              onSelectShop={handleSelectShop}
            />
          )}
        </Card>
      </main>
    </div>
  );
};

export default ShopListPage;
