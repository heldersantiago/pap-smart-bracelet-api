// lib/server.ts
import app from "./app";
const PORT = 80 || 3001;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
