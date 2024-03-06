import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Layout = lazy(() => import('./layout/Layout'));
const Index = lazy(() => import('./templates/page'));
const Mail = lazy(() => import('./templates/examples/mail/page'));
const Dashboard = lazy(() => import('./templates/examples/dashboard/page'));
const Cards = lazy(() => import('./templates/examples/cards/page'));
const Tasks = lazy(() => import('./templates/examples/tasks/page'));
const Playground = lazy(() => import('./templates/examples/playground/page'));
const Forms = lazy(() => import('./templates/examples/forms/page'));
const Music = lazy(() => import('./templates/examples/music/page'));
const Authentication = lazy(() => import('./templates/examples/authentication/page'));

const MyRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Mail" element={<Mail />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Cards" element={<Cards />} />
          <Route
            path="/Tasks"
            element={
              <Suspense fallback={<div>Chargement...</div>}>
                <Tasks />
              </Suspense>
            }
          />
          <Route path="/Playground" element={<Playground />} />
          <Route path="/Forms" element={<Forms />} />
          <Route path="/Music" element={<Music />} />
          <Route path="/Authentication" element={<Authentication />} />
          <Route path="*" element={<div> Page not found </div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default MyRoutes;
