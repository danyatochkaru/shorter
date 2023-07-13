import React from "react";
import {Toaster} from "react-hot-toast";
import {Inter} from 'next/font/google'
import './globals.scss'

const inter = Inter({subsets: ['latin', 'cyrillic'], preload: true})

export const metadata = {
    title: 'dev | Сокращение ссылок'
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
        <body className={inter.className}>
        {children}
        <Toaster position={"bottom-right"}/>
        </body>
        </html>

    )
}
