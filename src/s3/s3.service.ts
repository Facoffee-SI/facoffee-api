import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await this.s3.upload(params).promise();
    return result.Location;
  }

  async deleteImage(imageUrl: string): Promise<void> {
    const key = imageUrl.split('/').pop();
    const params = {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: key,
    };

    await this.s3.deleteObject(params).promise();
  }
}
