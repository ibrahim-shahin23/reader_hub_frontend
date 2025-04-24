import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import HomeBanner from '../components/Home/HomeBanner';
import NewReleases from '../components/Home/NewReleases';
import AIRecommendations from '../components/Home/AIRecommendations';
import BestSellers from '../components/Home/BestSellers';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <HomeBanner />
      <AIRecommendations />
      <NewReleases />
      <BestSellers />
    </div>
  );
};

export default Home;