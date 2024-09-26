import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import 'rsuite/dist/rsuite-no-reset.css';
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
      <App/>
  </React.Fragment>,
)
