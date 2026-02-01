import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CATEGORIES } from '@entities/category/data/categories';
import { CategoryTab } from '@entities/category/ui/CategoryTab';
import { ShopListView } from '@widgets/shop-list-view';
import { fetchShops } from '@entities/shop/api/shopApi';

import { Card } from '@shared/ui';
import { Spinner } from '@shared/ui/Spinner';

const ShopListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState(null);
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * URL 쿼리 (?c=korean) → 상태 동기화
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromQuery = params.get('c');

    if (categoryFromQuery) {
      setActiveCategory(categoryFromQuery);
    } else {
      setActiveCategory(null);
    }
  }, [location.search]);

  /**
   * 가게 목록 조회
   */
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

  /**
   * 카테고리 필터링
   */
  const filteredShops = useMemo(() => {
    if (!activeCategory) return shops;
    return shops.filter(shop => shop.category === activeCategory);
  }, [shops, activeCategory]);

  /**
   * 카테고리 변경 핸들러
   */
  const handleCategoryChange = categoryValue => {
    setActiveCategory(categoryValue);

    const params = new URLSearchParams();
    if (categoryValue) {
      params.set('c', categoryValue);
    }

    navigate(`/shops${params.toString() ? `?${params}` : ''}`, {
      replace: true,
    });
  };

  /**
   * 가게 선택 → 상세 페이지 이동
   */
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
        {/* ===== 카테고리 탭 ===== */}
        <Card variant="default" padding="20px">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {CATEGORIES.map(category => (
              <CategoryTab
                key={category.value ?? 'all'}
                label={category.label}              
                isActive={activeCategory === category.value}
                onClick={() => handleCategoryChange(category.value)}
              />
            ))}
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