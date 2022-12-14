import { useState, useEffect } from 'react';
import http from '../lib/api';
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
export const withEditableResource = (Component, resourcePath, resoureName) => {
  return props => {
    const [originalData, setOriginalData] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
      (async() => {
        const response = await http.get(resourcePath);
        setOriginalData(response.data);
        setData(response.data);
      })
    }, [])
    const onChange = changes => {
      setData({...data, ...changes})
    }
    const onSave = async () => {
      const response = await http.post(resourcePath, { [resoureName]: data});
      setOriginalData(response.data);
      setData(response.data);
    }
    const onUpdate = async () => {
      const response = await http.put(resourcePath, { [resoureName]: data});
      setOriginalData(response.data);
      setData(response.data);
    }

    const onReset = () => {
      setData(originalData);
    }
    const resourceProps = {
      [resoureName] : data,
      [`onChange${capitalize(resoureName)}`] : onChange,
      [`onSave${capitalize(resoureName)}`] : onSave,
      [`onUpdate${capitalize(resoureName)}`] : onUpdate,
      [`onReset${capitalize(resoureName)}`] : onReset
    }
    return <Component {...props} {...resourceProps}/>
    
  }
}

