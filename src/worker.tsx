import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";

// Import the JSON at module initialization so it's loaded into memory when
// the server/worker boots. The file lives under `src/nlt.json`.
import nltData from "./nlt.json";

export type AppContext = {
  nlt: unknown;
};

function capitalize(str) {
  if (!str) return ""; // handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // attach preloaded nlt data to the context so routes can access it from memory
    ctx.nlt = nltData;
    //console.log("NLT data loaded into context", ctx.nlt);
  },
  render(Document, [
    route("/", Home),
    route("/flm/:book/:chapter/:verse", function ({ request, params, ctx }) {
      console.log("Params received:", params);
      console.log(ctx.nlt[capitalize(params.book)]);
      return (
        <>
          <h1>
            {capitalize(params.book)} {params.chapter}:{params.verse}
          </h1>
          <p>
            {ctx.nlt[capitalize(params.book)]?.[params.chapter.toString()]?.[
              params.verse.toString()
            ] || "Verse not found"}
          </p>
        </>
      );
    }),
  ]),
]);
