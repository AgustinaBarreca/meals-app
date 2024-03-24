import { Cart } from '../components/Cart.jsx';
import { Checkout } from '../components/Checkout.jsx';
import { Header } from '../components/Header.jsx'
import { Meals } from '../components/Meals.jsx'
import { Users } from '../components/Users.jsx';
import { CartContextProvider } from '../store/CartContex.jsx'
import { UserPersonalDataContextProvider } from '../store/UserPersonalDataContext.jsx';
import { UserProgressContextProvider } from '../store/UserProgressContext.jsx'

function App() {
  return (
    <>
      <UserPersonalDataContextProvider>
        <UserProgressContextProvider>
          <CartContextProvider>
            <Header />
            <Meals />
            <Cart />
            <Checkout />
            <Users />
          </CartContextProvider>
        </UserProgressContextProvider>
      </UserPersonalDataContextProvider>
    </>
  );
}

export default App;
