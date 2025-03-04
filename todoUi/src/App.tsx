import { RouterProvider } from 'react-router-dom'
import router from './routes/config.axios'
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  
const queryClient = new QueryClient()
  return (
    <>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} future={{ v7_startTransition: true}}/>
          <Toaster/>
        </QueryClientProvider>
    </>
  )
}

export default App
