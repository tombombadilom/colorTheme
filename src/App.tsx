import { lazy, Suspense } from 'react';
import './App.css';
import { ThemeProvider } from './lib/ThemeProvider';
import loading from './lib/loading';
import { ErrorBoundary } from './lib/ErrorBoundary';
// import Canvas from './lib/BackgroundCanvas/Canvas';
const Routes = lazy(() => import('./Routes'));

function App() {
  return (
    <ErrorBoundary>
        <Suspense fallback={loading()}>
          <ThemeProvider defaultTheme={"dark"} storageKey={"vite-ui-theme"}>
            {/* <Canvas defaultBackground={"none"} /> */}
            <Routes />
          </ThemeProvider>
        </Suspense>
      </ErrorBoundary>
  )
}

export default App
