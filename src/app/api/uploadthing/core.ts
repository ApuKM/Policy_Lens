import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const f = createUploadthing();

/**
 * PolicyLens file router.
 *
 * Add additional upload endpoints below following the same pattern.
 * Docs: https://docs.uploadthing.com/api-reference/server#file-router
 */
export const ourFileRouter = {
  /**
   * General image uploads (e.g. profile pictures, policy document covers).
   * Max 4 MB, 1 file per request. Requires authenticated session.
   */
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user) throw new UploadThingError("Unauthorized");

      // Metadata returned here is accessible in onUploadComplete
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete — userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);
      // Return value is sent back to the client via `onClientUploadComplete`
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),

  /**
   * Policy document uploads (PDF, DOCX).
   * Max 8 MB, up to 5 files per request. Requires authenticated session.
   */
  policyUploader: f({
    pdf: { maxFileSize: "8MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user) throw new UploadThingError("Unauthorized");

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Document upload complete — userId:", metadata.userId);
      console.log("Document URL:", file.ufsUrl);
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
