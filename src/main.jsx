import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router.jsx'
import Navber from './Layout/Navber.jsx'
import AuthProvider from './Auth/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

const queryClient = new QueryClient()
// const [queryClient] = React.useState(() => new QueryClient())
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Router}>
          <Navber></Navber>
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
