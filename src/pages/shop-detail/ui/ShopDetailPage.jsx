import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@widgets/header';
import { ShopInfoCard } from '@widgets/shop-info-card';
import { ReviewBoard } from '@widgets/review-board';
import { fetchShopById } from '@entities/shop/api/shopApi';
import { fetchReviewsByShop } from '@entities/review/api/reviewApi';
import { submitReview } from '@features/review/write';
import { generateNickname } from '@features/auth/generate-nickname';
import { Spinner } from '@shared/ui/Spinner';
import { Button } from '@shared/ui/Button/Button';

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
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f1f4fb' }}>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', padding: '120px 0' }}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f1f4fb' }}>
        <Header />
        <main style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px', display: 'grid', gap: '24px' }}>
          <div
            style={{
              backgroundColor: '#ffe7e7',
              color: '#c62828',
              borderRadius: '18px',
              padding: '32px',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            {loadError}
          </div>
          <Button onClick={handleGoBack} style={{ width: '180px', justifySelf: 'center' }}>
            목록으로 돌아가기
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f4fb' }}>
      <Header />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 96px', display: 'grid', gap: '48px' }}>
        <Button
          variant="subsidiary"
          onClick={handleGoBack}
          style={{ width: 'fit-content', padding: '10px 18px', borderRadius: '12px', fontWeight: 600 }}
        >
          ← 목록으로 돌아가기
        </Button>

        <ShopInfoCard shop={shop} />

        <ReviewBoard
          reviews={reviews}
          nickname={nickname}
          onSubmitReview={handleSubmitReview}
          onRefreshNickname={refreshNickname}
          isSubmitting={isSubmitting}
        />
      </main>
    </div>
  );
};

export default ShopDetailPage;
