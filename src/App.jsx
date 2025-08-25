

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, Store } from './redux/Store'
import { Provider } from 'react-redux'
import Router from './routes/Router';

function App() {

  return (
    
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={Store}>
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Router/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
      </Provider>
     </PersistGate>
      
  )
}

export default App
