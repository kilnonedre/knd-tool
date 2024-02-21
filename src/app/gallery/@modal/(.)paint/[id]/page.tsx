import React from 'react'
import Modal from '@/view/gallery/component/modal'

const PhotoModal = ({ params }: { params: { id: string } }) => {
  return <Modal id={params.id} />
}

export default PhotoModal
