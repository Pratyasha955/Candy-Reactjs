import React, { Fragment, useState } from 'react';
import CandyForm from './component/CandyForm/CandyForm';
import CandyHeader from './component/CandyHeader/CandyHeader';
import CandyList from './component/CandyList/CandyList';
import Cart from './component/Cart/Cart';
import { CandyProvider  } from './component/Store/CandyContext';

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Fragment>
      <CandyProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <CandyHeader onShowCart={showCartHandler} />
        <CandyForm />
        <CandyList />
      </CandyProvider>
    </Fragment>
  );
};

export default App;