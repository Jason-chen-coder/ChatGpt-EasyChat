import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { withAuth } from "./components/AuthRoute";
import { BrowserRouter, Outlet, Route, Routes, } from 'react-router-dom'
import router from './router'
import LoadingPage from './components/LoadingPage'
import { ConfigProvider, theme } from 'antd';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Suspense fallback={LoadingPage()}>
          <Routes>
            {
              router.filter(item => !item.needAuth).map(
                route => <Route key={route.path} path={route.path} Component={route.Component}></Route>
              )
            }
            <Route path='/' Component={withAuth(
              () => <React.Fragment>
                <Outlet />
              </React.Fragment>
            )}>
              {router.filter(item => item.needAuth).map(
                route => <Route key={route.path} path={route.path} Component={route.Component}></Route>
              )}
            </Route>
          </Routes>
        </Suspense>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
)
