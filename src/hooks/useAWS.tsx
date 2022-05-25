import S3 from 'aws-sdk/clients/s3';
import { updateProfileImage } from '@apis/member';
import fs from 'react-native-fs';
import { decode } from 'base64-arraybuffer';
import { AWS, getAWS } from '@apis/aws';

const useAWS = () => {
  const upload = async (uri: string, fileName: string, user: number) => {
    const aws: AWS = await getAWS();
    const s3 = new S3({
      accessKeyId: aws.accessKeyId,
      secretAccessKey: aws.secretAccessKey,
      region: 'ap-northeast-2',
    });

    const contentDisposition = 'inline;filename="' + fileName + '"';
    const base64 = await fs.readFile(uri, 'base64');
    const arrayBuffer = decode(base64);
    const uploadParams = {
      Bucket: 'meyou-s3',
      Body: arrayBuffer,
      Key: `profile/${user}/profile.jpeg`,
      ContentType: 'image/jpeg',
      ContentDisposition: contentDisposition,
      ACL: 'public-read',
    };
    s3.putObject(uploadParams, async err => {
      if (!err) {
        const url = `https://meyou-s3.s3.ap-northeast-2.amazonaws.com/profile/${user}/profile.jpeg`;
        await updateProfileImage(user, url);
      } else {
        console.log(err);
      }
    });
  };

  return { upload };
};

export default useAWS;
