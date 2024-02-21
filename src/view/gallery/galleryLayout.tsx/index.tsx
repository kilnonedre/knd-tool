import React from 'react'
import types from './galleryLayoutType.d'
import Header from './component/header'

const GalleryLayout = ({ children, modal }: types.ConfigProps) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      {modal}
    </div>
  )
}

export default GalleryLayout
