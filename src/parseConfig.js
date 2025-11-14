import Parse from "parse";

Parse.initialize(
  "YsjXEUYnz2m6YGZvzfqAtvsJFLcpge44m7kl7hDP",
  "gzXItqBZFqkyaObjF7WW1sa0DRTlKXgnwHbESIbu"
);

Parse.serverURL = "https://parseapi.back4app.com/";

// 🧠 Prevent Parse from initializing LiveQuery
try {
  Parse.CoreManager.set("LIVEQUERY_SERVER_URL", "");
  Parse.LiveQuery.close(); // ensure it doesn't run
} catch (e) {
  console.warn("LiveQuery disabled:", e.message);
}

export default Parse;
