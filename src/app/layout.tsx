"use client";
import Header from "@/componemt/HeaderConponemt/header";
import Footer from "@/componemt/FooterConponemt/footer";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextAuthWrapper from "@/library/next.auth.wrapper";
import { usePathname } from "next/navigation";
import { auth } from "@/auth";
import { ToastContainer } from "react-toastify";


const RootLayout =  ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  const hiddenPaths = [
    "/admin",
    "/auths/login",
    "/auths/register",
    "/dashboard",
    "/verify",
  ];

  const shouldHideLayout = hiddenPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <>
    <html lang="en" className="mdl-js">
      <body>
        <AntdRegistry>
          <ConfigProvider>
            <NextAuthWrapper>
              {!shouldHideLayout && <Header />}
              {children}
              {!shouldHideLayout && <Footer />}
            </NextAuthWrapper>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
     <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
    
  );
};
export default RootLayout;
