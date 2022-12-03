import { useState } from 'react'
import ReactSlidy from 'react-slidy'
import Arrow from './Arrow'
const createStyles = isActive => ({
  background: 'transparent',
  border: 0,
  color: isActive ? '#333' : '#ccc',
  cursor: 'pointer',
  fontSize: '32px'
});

export default ({children, slides = []}) => {
  const [actualSlide, setActualSlide] = useState(0)

  const updateSlide = ({ currentSlide }) => {
    setActualSlide(currentSlide)
  }

  return (
    <>
      <ReactSlidy ArrowLeft={LeftArrow} ArrowRight={RightArrow} doAfterSlide={updateSlide} slide={actualSlide}>
        {children}
      </ReactSlidy>
      <div className="flex justify-center">
        {slides.map((_, index) => {
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

const LeftArrow = (props) => <Arrow {...props} left/>
const RightArrow = (props) => <Arrow {...props}/>