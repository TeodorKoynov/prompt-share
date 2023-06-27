import './globals.css'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'PromptShare',
    description: 'Discover & Share AI Prompts',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className={"main"}>
            <div className={"gradient"}/>
        </div>

        <main className={"app"}>
            {children}
        </main>
        </body>
        </html>
    )
}
