import { auth } from "@/auth";
import AdminContent from "@/componemt/layout/admin.content";
import AdminFooter from "@/componemt/layout/admin.footer";
import AdminnHeader from "@/componemt/layout/admin.header";
import AdminSider from "@/componemt/layout/admin.sider";
import { AdminContextProvider } from "@/library/admin.context";
import { Layout, theme } from "antd";

const AdminLayout = async ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) =>{
    const { Header, Content, Footer, Sider } = Layout;

    const session = await auth();
    return (
      <AdminContextProvider>
        <Layout>
        <AdminSider/>
        <Layout>
          <AdminnHeader session={session}/>
          <AdminContent>
            {children}
          </AdminContent>
          <AdminFooter/>
        </Layout>
      </Layout>
      </AdminContextProvider>
    )
}
export default AdminLayout;