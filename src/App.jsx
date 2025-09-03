import React from 'react'
import { ThemeProvider } from 'next-themes'
import { Outlet } from 'react-router-dom'
import DarkModeToggle from './Components/DarkModeToggle'
import { Toaster } from '@/Components/ui/sonner'
import store from './Components/store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <DarkModeToggle />
        <div className='w-full flex justify-center items-center h-[100vh] bg-gray-200 dark:bg-black'>
          <Outlet />
        </div>
        <Toaster position='top-center' richColors={true} duration={4000} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
