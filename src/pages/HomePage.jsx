import React from 'react'
import HeroSlider from '../components/HeroSlider'
import CategoryPick from '../components/CategoryPick'
import BestSellerProducts from '../components/BestSellerProducts'
export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <CategoryPick />
      <BestSellerProducts />
    </div>
  )
}
