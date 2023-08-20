import React from 'react';
import { HeaderMegaMenu } from '@/component/menu'; 

const Layout = ({ children }:any) => {
  return (
    <div>
      <HeaderMegaMenu />
      <main>{children}</main>
      {/* Anda bisa menambahkan footer atau elemen lainnya di sini */}
    </div>
  );
};

export default Layout;
