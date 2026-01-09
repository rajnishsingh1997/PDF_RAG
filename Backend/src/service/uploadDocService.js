import AWS from "aws-sdk";

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error(
    "AWS credentials are not configured. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables."
  );
}

AWS.config.update({
  region: "ap-south-1",
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

const uploadDocService = async (uploadedFile, userID) => {
  const params = {
    Bucket: "pdf-rag-storage",
    Key: uploadedFile.originalname,
    Body: uploadedFile.buffer,
  };
  try {
    const result = await s3.upload(params).promise();
    return {
      message: "File uploaded successfully",
      fileUrl: result.Location,
      userID: userID,
    };
  } catch (error) {
    console.log("Error in uploadDocService:", error);
    throw error;
  }
};

export default uploadDocService;
