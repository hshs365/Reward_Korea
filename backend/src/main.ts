import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import this
import { join } from 'path'; // Import this

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Specify type
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  // Configure static assets
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // This prefix will be used in URLs to access the files
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();