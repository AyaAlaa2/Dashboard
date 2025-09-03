import React from 'react';

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-20'>
      <div className='w-10 h-10 border-4 border-black dark:border-white rounded-full border-t-transparent animate-spin'></div>
    </div>
  );
};

export default Loading;
