import { useEffect, lazy, Suspense } from 'react';
import './App.css';
import { useTheme, ThemeProvider } from './lib/ThemeProvider';
import loading from './lib/loading';
import { ErrorBoundary } from './lib/ErrorBoundary';
import { Background } from './lib/background/Background';

const Routes = lazy(() => import('./Routes'));

function App() {
  const { isDarkMode } = useTheme();
  // Function to enter full screen
  const enterFullScreen = () => {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
      });
    }
  };

  useEffect(() => {
    // Automatically enter full screen on component mount
    enterFullScreen();

    // Clean up
    return () => {
      // Exit full screen when component unmounts
      if(document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, []);
  
  return (
    <ErrorBoundary>
      <Suspense fallback={loading()}>
        <Background speed={0.25} isDarkMode={isDarkMode}/>
        <ThemeProvider defaultTheme={'dark'} storageKey={'vite-ui-theme'}>
          <Routes />
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
