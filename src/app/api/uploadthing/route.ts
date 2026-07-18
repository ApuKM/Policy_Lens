import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

/**
 * UploadThing Next.js App Router route handler.
 * Exposes GET and POST endpoints at /api/uploadthing
 */
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
