import { type FC, PropsWithChildren } from "hono/jsx"
import Footer from "./Footer"

interface LayoutProps {
    title: string
    description: string,
    scripts?: string[]
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, title, description, scripts }) => {
    const scriptElems = scripts ? scripts.map(script => {
        let path
        if (!script.startsWith("src/islands/")) {
            throw new Error("scripts must start with /src/islands/")
        } else if (import.meta.env.PROD) {
            let filename = script.replace("src/islands/", "").replace(".tsx", "")
            path = `/static/islands/${filename}.js`
        } else {
            path = script
        }
        return <script src={path}></script>
    }) : []
    return (
        <html>
            <head>
                <title>{title}</title>
                <meta name="description" content={description} />
                {import.meta.env.PROD ? <link rel="stylesheet" href="/static/style.css" /> : <link rel="stylesheet" href="/src/style.css" />}
                {scriptElems}
            </head>
            <body>
                {children}
                <Footer />
            </body>
        </html>
    )
}

export default Layout