import { ArrowRightOutlined } from '@ant-design/icons';
import { MessageDisplay } from 'components/common';
import { ProductShowcaseGrid } from 'components/product';
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from 'constants/routes';
import {
  useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop
} from 'hooks';
import bannerImg from 'images/jordan-banner1.png';
import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  useDocumentTitle('SNKRS-PARIS | Home');
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended
  } = useRecommendedProducts(6);

  return (
    <main className="content">
      <div className="home">
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>Sneakers</strong>
              &nbsp;from&nbsp;
              <strong>Paris</strong>
            </h1>
            <p>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              INSPIRÉ PAR LA CULTURE HIP-HOP ET SKATE DES 90'S,
              SNKRS PARIS A POUR BUT DE PROPOSER
              UNE SÉLECTION ÉCLECTIQUE ET POINTUE DE COLLABORATIONS LIMITÉES,
              DE MARQUES TELLES QUE NIKE, ADIDAS, YEEZY, NEW BALANCE
            </p>
            <br />
            <Link to={SHOP} className="button">
              Acheter &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img"><img src={bannerImg} alt="" /></div>
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Femme</h1>
            <Link to={FEATURED_PRODUCTS}>Tout voir</Link>
          </div>
          {(errorFeatured && !isLoadingFeatured) ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Homme</h1>
            <Link to={RECOMMENDED_PRODUCTS}>Tout voir</Link>
          </div>
          {(errorRecommended && !isLoadingRecommended) ? (
            <MessageDisplay
              message={errorRecommended}
              action={fetchRecommendedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={recommendedProducts}
              skeletonCount={6}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
