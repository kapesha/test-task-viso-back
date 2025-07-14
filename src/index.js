import { createServer } from "./createServer.js";

createServer().listen(3000, () => { console.log(`✅ Server is running on local port 3000`)})
