import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { router } from './Route/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <div className='mx-auto bg-white max-w-maxWidth'>
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
