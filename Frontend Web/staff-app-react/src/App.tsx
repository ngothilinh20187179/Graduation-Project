import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Route';
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>....loading</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;
