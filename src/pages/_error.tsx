import React from 'react';

interface IError {
  errorCode: number | boolean;
}

const Error = ({ errorCode }: IError) => {
  return (
    <>
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#ffeee7',
            width: '100%',
            height: '100vh',
          }}
        >
          <div style={{ fontSize: '20px' }}>
            {typeof errorCode === 'number' ? (
              <p>{errorCode}, Something went wrong. Please check your url!</p>
            ) : (
              <p>Oops,Unexpected error</p>
            )}

            <p>
              <button onClick={() => (location.href = '/')}>Home</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;

// 500 Internal Server Error를 핸들링할 수 있는 커스텀 페이지
