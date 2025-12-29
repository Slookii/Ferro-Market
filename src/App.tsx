```javascript
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Layout } from "./components/Layout";
import { AnimatedRoutes } from "./components/AnimatedRoutes";
import { ScrollToTop } from "./components/SEO";
import { ThemeProvider } from "./context/ThemeContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ProductsProvider } from "./context/ProductsContext";

function App() {
  return (
    <ThemeProvider>
      <ProductsProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Layout>
                <AnimatedRoutes />
              </Layout>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </ProductsProvider>
    </ThemeProvider>
  );
}

export default App;
```
