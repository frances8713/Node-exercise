import "dotenv/config"
import app1 from "./app1"

const port = process.env.PORT

app1.listen(port, () => {
    console.log(`[server] : Servere is running at http://localhost:${port}`)
});



