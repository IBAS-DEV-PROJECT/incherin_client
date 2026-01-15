import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopInfoCard } from '@widgets/shop-info-card';
import { ReviewBoard } from '@widgets/review-board';
import { fetchShopById } from '@entities/shop/api/shopApi';
import { fetchReviewsByShop } from '@entities/review/api/reviewApi';
import { submitReview } from '@features/review/write';
import { generateNickname } from '@features/auth/generate-nickname';
import { Spinner } from '@shared/ui/Spinner';
import { Card, Grid } from '@shared/ui';
import { Button } from '@shared/ui/Button/Button';

const layout = children => (
  <div style={{ minHeight: '100vh', backgroundColor: '#f1f4fb' }}>
    <main
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '48px 24px 96px',
        display: 'grid',
        gap: '32px',
      }}
    >
      {children}
    </main>
  </div>
);

const ShopDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    setNickname(generateNickname());
  }, []);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    fetchShopById(id)
      .then(data => {
        setShop(data);
        setLoadError('');
      })
      .catch(() => {
        setLoadError('가게 정보를 불러오지 못했어요.');
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;

    fetchReviewsByShop(id)
      .then(list => setReviews(list))
      .catch(() => setReviews([]));
  }, [id]);

  const refreshNickname = useCallback(() => {
    const next = generateNickname({ forceNew: true });
    setNickname(next);
  }, []);

  const handleSubmitReview = useCallback(
    async ({ rating, content }) => {
      if (!id) return;

      setIsSubmitting(true);
      try {
        const saved = await submitReview({
          shopId: id,
          nickname,
          rating,
          content,
        });

        setReviews(prev => [saved, ...prev]);
      } catch (error) {
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [id, nickname]
  );

  const handleGoBack = () => {
    navigate('/shops');
  };

  if (isLoading) {
    return layout(
      <Card
        padding="40px"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Spinner />
      </Card>
    );
  }

  if (loadError) {
    return layout(
      <Card padding="32px">
        <p style={{ margin: '0 0 16px', color: '#c62828', fontWeight: 600 }}>
          {loadError}
        </p>
        <Button variant="secondary" onClick={handleGoBack}>
          목록으로 돌아가기
        </Button>
      </Card>
    );
  }

  return layout(
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button
          variant="subsidiary"
          onClick={handleGoBack}
          style={{
            width: 'fit-content',
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 600,
          }}
        >
          ← 목록으로 돌아가기
        </Button>
      </div>

      <Grid columns={1} gap={32}>
        <div>
          <ShopInfoCard shop={shop} />
        </div>
        <Card padding="28px">
          <ReviewBoard
            reviews={reviews}
            nickname={nickname}
            onSubmitReview={handleSubmitReview}
            onRefreshNickname={refreshNickname}
            isSubmitting={isSubmitting}
          />
        </Card>
      </Grid>
    </>
  );
};

export default ShopDetailPage;
