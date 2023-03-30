import { AppDataSource } from "./data-source";
import { app } from "./app";

(async () => {
    await AppDataSource.initialize().catch((err) => {
        console.log("Error during Data Source initialization", err)
    })

    app.listen(3001, () => {
        console.log("Server running on port 3001")
    })
})()