// App.js
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Products from './pages/products';
 
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
         </Routes>
      </>
   );
};
 
export default App;