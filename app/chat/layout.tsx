"use client"
import Link from "next/link";
import { ReactNode } from "react";
import './chat.module.css'
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";


export default function ChatNavbar({ children }: { children: ReactNode }) {
    const router = useRouter();

    async function handleLogOut() {
        const response = await fetch("http://localhost:7089/logOut",{
          method: "POST",
          credentials:"include",
          // @ts-ignore
          withCredentials:true,
          headers: {
            "Content-Type": "application/json"
          }
        });

        router.push("/");
        

    }

    return (
        <div className="container">
            <aside className="navbar">
                <Link href={'/chat/1'}>Chat 1</Link>
                <Link href={'/chat/2'}>Chat 2</Link>
                <Link href={'/chat/2'}>Chat 3</Link>
                <Link href={'/chat/4'}>Chat 4</Link>

                <Button color="danger" onClick={handleLogOut}>
                    Log out
                </Button>
            </aside>
            {children}
        </div>
    )
}