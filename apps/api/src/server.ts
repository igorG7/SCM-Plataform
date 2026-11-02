import App from "./app.js";

const PORT = process.env.PORT || 3000;
const app = App.app;

app.listen(PORT, () => {
  console.log("Server started");
  console.log(`Running in: http://localhost:${PORT}`);
});
