import ArrowIcon from './ArrowIcon'

const Arrow = ({ left = false, ...props }) => {
  return <button {...props} className={`text-gray-500 rounded-full mx-1 absolute z-10 top-1/2 -translate-y-1/2 translate-x-0 bg-white opacity-50 ${left ? "left-0" : "right-0"}`}><ArrowIcon className={`w-8 h-8 ${left ? "-scale-x-100" : ""}`} /></button>
}

export default Arrow
