import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const auth = () => ({ id: 'fakeId' }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  cloudinaryUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 3 } })
    .middleware(async () => {
      const user = await auth();
      if (!user) throw new Error('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ file }: any) => {
      const formData = new FormData();
      formData.append('file', file.url); // Use the URL provided by uploadthing
      formData.append('upload_preset', 'replicate-stream'); // Cloudinary preset
      formData.append('folder', 'replicate-stream'); // Cloudinary folder

      const imageUrl = await fetch(
        `https://api.cloudinary.com/v1_1/mauloboo/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )
        .then((res) => res.json())
        .then(({ secure_url }) => secure_url);
      return imageUrl;
    }),

  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 3 } })
    .middleware(async () => {
      const user = await auth();
      if (!user) throw new Error('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async () => {
      // Code to handle after upload
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
