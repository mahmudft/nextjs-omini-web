import Link from "next/link";


export default function NavbarItem({title,url}){
    return (<Link className={"py-2 rounded hover:bg-neutralOff "} href={url}>{title}</Link>)
}