import DetailPage from '@/componemt/DeatilProduct/detailproduct';
import React from 'react'

const Detail = ({params} : {params: {id:string}}) => {
    const {id} = params;
  return (
    <>
        <DetailPage id={id}/>
    </>
  )
}

export default Detail