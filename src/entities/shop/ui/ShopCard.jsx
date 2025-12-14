import React from 'react';
import { Card } from '@shared/ui/Card/Card';
import { Badge } from '@shared/ui/Badge/Badge';
import { Button } from '@shared/ui/Button/Button';

export const ShopCard = ({ shop, onSelect }) => {
  if (!shop) return null;

  const handleClick = () => {
    onSelect?.(shop);
  };

  return (
    <Card
      padding="0"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #dce4ff',
        borderRadius: '20px',
        boxShadow: '0 8px 24px rgba(39, 80, 155, 0.08)',
        background: '#ffffff',
      }}
    >
      {shop.image && (
        <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
          <img
            src={shop.image}
            alt={shop.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.92)',
              transition: 'transform 0.3s ease',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: '18px',
              top: '18px',
              fontSize: '13px',
              color: '#ffffff',
              backgroundColor: 'rgba(39, 80, 155, 0.85)',
              padding: '6px 12px',
              borderRadius: '999px',
              fontWeight: 600,
              letterSpacing: '0.4px',
            }}
          >
            {shop.category}
          </span>
        </div>
      )}

      <div style={{ padding: '22px 24px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '22px', margin: 0, color: '#1b2a55', fontWeight: 700 }}>{shop.name}</h3>
          <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#4b5563', lineHeight: '22px' }}>
            {shop.description}
          </p>
        </div>

        {Array.isArray(shop.highlights) && shop.highlights.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {shop.highlights.map(highlight => (
              <Badge key={highlight} variant="secondary" size="small" backgroundColor="#eaf2ff" color="#27509B">
                #{highlight}
              </Badge>
            ))}
          </div>
        )}

        <Button
          variant="primary"
          onClick={handleClick}
          style={{
            marginTop: 'auto',
            borderRadius: '12px',
            padding: '12px 0',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #27509B 0%, #1a2a6c 100%)',
          }}
        >
          자세히 보기
        </Button>
      </div>
    </Card>
  );
};

export const ShopDetailInfo = ({ shop }) => {
  if (!shop) return null;

  return (
    <section style={{ display: 'grid', gap: '16px', fontSize: '15px', color: '#1f2933' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <span style={{ minWidth: '80px', fontWeight: 600, color: '#27509B' }}>전화번호</span>
        <span>{shop.phone || '정보 준비 중'}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <span style={{ minWidth: '80px', fontWeight: 600, color: '#27509B' }}>주소</span>
        <span>{shop.address || '정보 준비 중'}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <span style={{ minWidth: '80px', fontWeight: 600, color: '#27509B' }}>영업시간</span>
        <span>{shop.hours || '정보 준비 중'}</span>
      </div>
    </section>
  );
};
