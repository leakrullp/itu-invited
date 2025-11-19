import Parse from "parse";

let isInitalized = false;

export default function initializeAllParse() {
  if (isInitalized) return Parse;

  Parse.initialize(
    "YsjXEUYnz2m6YGZvzfqAtvsJFLcpge44m7kl7hDP",
    "gzXItqBZFqkyaObjF7WW1sa0DRTlKXgnwHbESIbu"
  );

  Parse.serverURL = "https://parseapi.back4app.com/";

  try {
    Parse.CoreManager.set("LIVEQUERY_SERVER_URL", "");
    Parse.LiveQuery.close();
  } catch (e) {
    console.warn("LiveQuery disabled:", e.message);
  }

  isInitalized = true;
  return Parse;
}
