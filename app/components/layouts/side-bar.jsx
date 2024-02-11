import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import NavbarItem from "./navbar-item.jsx"


export default function SideBar() {
    const router = useRouter();

    async function handleLogOut() {
        const response = await fetch("http://localhost:7089/logOut", {
            method: "POST",
            credentials: "include",
            // @ts-ignore
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });

        router.push("/");


    }
    return (
        <aside className="w-full h-full flex flex-col items-center justify-between gap-2">
            <div className="flex h-full flex-col items-center gap-1">
                <NavbarItem url={"/chat/1"} title={"Chat 1"} />
                <NavbarItem url={"/chat/2"} title={"Chat 2"} />
                <NavbarItem url={"/chat/3"} title={"Chat 3"} />
                <NavbarItem url={"/chat/4"} title={"Chat 4"} />
            </div>

            <Button size="sm" color="danger" onClick={handleLogOut}>
                Log out
            </Button>
        </aside>
    )
}