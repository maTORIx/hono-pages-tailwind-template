import { Hono } from 'hono'
import Layout from "@/components/Layout"

const app = new Hono()

app.get('/', (c) => {
  return c.html(<Layout title="Home" description="Home page" scripts={["src/islands/main.tsx"]}>
    <p>nyossu!</p>
  </Layout>)
})

export default app
