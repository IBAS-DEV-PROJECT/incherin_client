import { BrowserRouter } from 'react-router-dom';

export const Providers = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};
