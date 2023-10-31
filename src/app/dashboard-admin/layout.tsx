import { LayoutAdmin } from "@/modules/_global";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LayoutAdmin>
                {children}
            </LayoutAdmin>
        </>
    );
}