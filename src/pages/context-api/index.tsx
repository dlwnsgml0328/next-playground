import React, { createContext, useContext } from 'react';

const ContextAPI = () => {
  const MyContext = createContext('default blah');
  const value = useContext(MyContext);

  console.log('- useContext value:', value);
  return (
    <div>
      <h1>Hello Context API!</h1>

      <span>{value}</span>
    </div>
  );
};

export default ContextAPI;
