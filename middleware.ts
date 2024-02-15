import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
    // options.withCredentials = true;
    // options.credentials = "include";
    const public_urls = ['/login', '/signup']
    
    
    try {
        // // @ts-ignore
        // const token = request.cookies;
        
        const store = cookies()
        console.log("--------------------------------------")
        let data = (store.get("authToken")?.value);
        console.log(data);
        console.log("--------------------------------------")
        // const cookie = `authToken=${token.value}`;
        const response = await fetch('http://localhost:7089/me', {
            credentials: 'same-origin',
            // @ts-ignore
            withCredentials: true,
            method:"POST",
            headers:{
                "Cookie": `authToken=${data}`
            }
        })
        if (public_urls.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect('/chat')
        } else {
            return
            // NextResponse.next()
        }


    } catch (error) {
        if (public_urls.includes(request.nextUrl.pathname)) {
            return
            // NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        }
    }

    // if(response.ok){
    // }else{

    // }
    // return NextResponse.redirect(new URL('/home', request.url))
}