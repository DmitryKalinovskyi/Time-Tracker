import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import 'rsuite/dist/rsuite.min.css';
import App from './app/App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
      <App/>
  </React.Fragment>,
)
