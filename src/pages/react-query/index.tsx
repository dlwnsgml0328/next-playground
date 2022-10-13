import React, { useCallback, useEffect, useState } from 'react';
import { REACT_APP_API_KEY } from '@config';
import axios, { AxiosResponse } from 'axios';

const ReactQueryComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&language=en-US&query=spiderman`
      );

      if (response.status !== 200) {
        throw new Error('Unexpected status code: ' + response.status);
      }
      setData(response.data.results);
      setIsLoading(true);
    } catch (error) {
      console.error('error occurred', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) fetchData();
  }, [isLoading, fetchData]);

  return (
    <div>
      <h1>Hello React Query!</h1>

      {isLoading ? (
        <div>
          {data.slice(0, 5).map((item: any) => (
            <div key={item.id}>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ReactQueryComponent;
