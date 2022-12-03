import { useState } from 'react'
import ReactSlidy from 'react-slidy'


const SLIDES = ['pictures/1.jpg', 'pictures/2.jpg', 'pictures/3.jpg', 'pictures/4.jpg']

const createStyles = isActive => ({
  background: 'transparent',
  border: 0,
  color: isActive ? '#333' : '#ccc',
  cursor: 'pointer',
  fontSize: '32px'
})

export default () => {
  const [actualSlide, setActualSlide] = useState(0)

  const updateSlide = ({ currentSlide }) => {
    setActualSlide(currentSlide)
  }

  return (
    <>
      <ReactSlidy ArrowLeft={LeftArrow} ArrowRight={RightArrow} doAfterSlide={updateSlide} slide={actualSlide}>
        {SLIDES.map(src => (
          <img alt="" key={src} src={src} />
        ))}
      </ReactSlidy>
      <div className="flex justify-center">
        {SLIDES.map((_, index) => {
          return (
            <button
              key={index}
              style={createStyles(index === actualSlide)}
              onClick={() => updateSlide({ currentSlide: index })}
            >
              &bull;
            </button>
          )
        })}
      </div>
    </>
  )
}
const ArrowIcon = ({...props}) => <svg aria-label="Arrow" {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <g>
    <path fill="none" d="M0 0h24v24H0z" />
    <path fill="currentColor" d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
  </g>
</svg>

const Arrow = ({left = false, ...props}) => {
  return <button {...props} className={`text-gray-500 rounded-full mx-1 absolute z-10 top-1/2 -translate-y-1/2 translate-x-0 bg-white opacity-50 ${left ? "left-0" : "right-0"}`}><ArrowIcon className={`w-8 h-8 ${left ? "-scale-x-100" : ""}`}/></button>
}
const LeftArrow = (props) => <Arrow {...props} left/>
const RightArrow = (props) => <Arrow {...props}/>