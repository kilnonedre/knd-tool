import React from 'react'
import types from './galleryLayoutType.d'
import Header from './component/header'
import Footer from './component/footer'

const GalleryLayout = ({ children, modal }: types.ConfigProps) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
      {modal}
    </div>
  )
}

export default GalleryLayout
