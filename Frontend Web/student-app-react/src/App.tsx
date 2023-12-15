import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Route';
import { Suspense } from 'react';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner/>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;

