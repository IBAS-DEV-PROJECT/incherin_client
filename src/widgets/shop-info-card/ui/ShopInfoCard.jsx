import React from 'react';
import { Card } from '@shared/ui/Card/Card';
import { Badge } from '@shared/ui/Badge/Badge';
import { ShopDetailInfo } from '@entities/shop';

export const ShopInfoCard = ({ shop }) => {
  if (!shop) return null;

  return (
    <Card
      padding="0"
      style={{
        overflow: 'hidden',
        borderRadius: '28px',
        border: '1px solid #d7e0ff',
        boxShadow: '0 16px 40px rgba(26, 63, 148, 0.15)',
        backgroundColor: '#ffffff',
      }}
    >
      {shop.image && (
        <div
          style={{ position: 'relative', height: '280px', overflow: 'hidden' }}
        >
          <img
            src={shop.image}
            alt={shop.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.93)',
            }}
          />
          <Badge
            variant="primary"
            size="large"
            backgroundColor="rgba(25, 55, 109, 0.85)"
            style={{
              position: 'absolute',
              left: '24px',
              top: '24px',
              borderRadius: '999px',
              padding: '10px 18px',
              fontWeight: 700,
            }}
          >
            {shop.category}
          </Badge>
        </div>
      )}

      <div style={{ padding: '32px 36px', display: 'grid', gap: '28px' }}>
        <header
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '34px',
              color: '#1a2a6c',
              fontWeight: 800,
            }}
          >
            {shop.name}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '17px',
              lineHeight: '26px',
              color: '#3f4a5e',
            }}
          >
            {shop.description}
          </p>

          {Array.isArray(shop.highlights) && shop.highlights.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {shop.highlights.map(item => (
                <Badge
                  key={item}
                  variant="secondary"
                  size="small"
                  backgroundColor="#eaf0ff"
                  color="#1f3f8a"
                >
                  #{item}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <ShopDetailInfo shop={shop} />

        {Array.isArray(shop.menu) && shop.menu.length > 0 && (
          <section
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 700,
                color: '#1f2933',
              }}
            >
              추천 메뉴
            </h2>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                color: '#374151',
                fontSize: '15px',
                lineHeight: '24px',
              }}
            >
              {shop.menu.map(menuItem => (
                <li key={menuItem}>{menuItem}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Card>
  );
};
