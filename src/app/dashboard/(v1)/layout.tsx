import ViewLayout from "@/modules/_global/front/view/view_layout";

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ViewLayout>
                {children}
            </ViewLayout>
        </>
    );
}