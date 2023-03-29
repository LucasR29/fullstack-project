import { AppDataSource } from "./data-source";
import { app } from "./app";

(async () => {
    await AppDataSource.initialize().catch((err) => {
        console.log("Error during Data Source initialization", err)
    })

    app.listen(3000, () => {
        console.log("Sevidor executando")
    })
})()