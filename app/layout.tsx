import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: 'ZX Gothic Jewellery | Dark Elegance, Forged in Silver',
  description: 'Discover handcrafted gothic jewellery — skull rings, dark crystal necklaces, bat wing cuffs, and more. Premium oxidized silver pieces for the darkly inclined.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
