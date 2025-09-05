import React from 'react';
import useDocTitle from './useDocTitle';

const PageNotFound = () => {
  useDocTitle('Page Not Found');

  return (
    <div className='flex flex-col items-center justify-center h-[100vh] gap-3 bg-gray-200 dark:bg-black'>
      <p className='text-8xl text-red-600 font-bold italic'>404</p>
      <p className='text-4xl text-black font-medium dark:text-gray-200'>
        Oops !! Page Not Found
      </p>
    </div>
  );
};

export default PageNotFound;
