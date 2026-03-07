import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { QueryProvider } from './providers/QueryProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="tripmate-theme">
      <AuthProvider>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
