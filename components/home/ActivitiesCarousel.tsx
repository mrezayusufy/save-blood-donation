import { Block, BlockTitle, Card } from 'konsta/react'
import React from 'react'
import Carousel from '../carousel'
import Flickity from "react-flickity-component";

export default () => {
 
  return (
    <>
      <BlockTitle>فعالیت ها</BlockTitle>
      <Block >
        <Slider/>
      </Block>
    </>
  )
}
const slides = [
  {
    id: "1",
    request: {
      donor: {
        fullName: "علی",
        phone: "09121234567",
        location: "کابل",
      },
      action: "ACCEPTED",
      seen: false
    },
    seen: false,
  }
]
function Slider() {
  const flickityOptions = {
    initialIndex: 2,
    prevNextButtons: false,
    pageDots: false,
    groupCells: 2,
    freeScroll: true,
    wrapAround: true
  }
  return (
    <Flickity
      className={'p-1 h-18'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      <SliderItem src="/pictures/1.jpg" />
      <SliderItem src="/pictures/2.jpg" />
      <SliderItem src="/pictures/3.jpg" />
      <SliderItem src="/pictures/4.jpg" />
    </Flickity>
  )
}
const SliderItem = ({ src }) =>
  (<div className="p-1 rounded-xl h-18 w-32">
    <img src={src} className="w-32 h-14 object-cover rounded-xl"/>
  </div>)