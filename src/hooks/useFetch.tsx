import { useToken } from './useToken';
import { useState, useEffect } from 'react';
import http from '../lib/api';
export const useFetch = (path, method = "GET") => {
  const [token] = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    http(path, {
      headers: {
        "Authorization": "Bearer " + token
      },
      method: method
    }).then(() => setLoading(true))
    .then((res) => setData(res))
    .catch(e => setError(e))
    .finally(() => setLoading(false))
  }, []);
  return [loading, error ,data];
}