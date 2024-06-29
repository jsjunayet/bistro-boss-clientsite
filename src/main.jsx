import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router.jsx'
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported
import { ToastContainer } from 'react-toastify';

import AuthProvider from './Auth/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Navbar from './component/navbar/Navbar.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Router}>
          <Navbar />
          <ToastContainer /> 
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
