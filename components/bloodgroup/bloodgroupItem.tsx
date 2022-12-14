import { ListItem, Radio } from "konsta/react"

export default ({item, bloodgroup, ...props}) => {
  return <ListItem label
  key={item}
  className="radio-group"
  title={item} media={
    <Radio
      name='bloodgroup'
      value={item}
      checked={bloodgroup === item}
      {...props}
      component='div' />
  } />
}