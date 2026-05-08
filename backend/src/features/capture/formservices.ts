interface FormData {
  username: string;
}

export const processForm = async (data: FormData, file: Express.Multer.File | undefined) => {
  if (!file) throw new Error('No photo provided');

  // Here you would save to your Database (Prisma/TypeORM/Mongoose)
  console.log(`Saving user ${data.username} with file ${file.filename}`);
  
  return {
    success: true,
    photoUrl: `/uploads/${file.filename}`
  };
};