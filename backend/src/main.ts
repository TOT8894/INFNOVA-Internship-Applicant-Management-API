import { ValidationPipe } from '@nestjs/common';
import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Internship Applicant Management API')
    .setDescription(
      'API for managing internship applicants',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your JWT access token',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup('docs', app, document);

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  // Default homepage
  app.getHttpAdapter().get('/', (req, res) => {
    res.type('html').send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Internship Applicant Management API</title>

        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #1f2937;
          }

          .container {
            width: 90%;
            max-width: 800px;
            background: white;
            padding: 50px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            text-align: center;
          }

          h1 {
            margin-bottom: 15px;
            color: #111827;
          }

          p {
            color: #6b7280;
            line-height: 1.6;
          }

          .status {
            display: inline-block;
            margin: 20px 0;
            padding: 8px 16px;
            border-radius: 20px;
            background: #dcfce7;
            color: #166534;
            font-weight: bold;
          }

          .links {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 30px;
            flex-wrap: wrap;
          }

          a {
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 8px;
            background: #2563eb;
            color: white;
            font-weight: bold;
          }

          a:hover {
            background: #1d4ed8;
          }

          .api-link {
            background: #374151;
          }

          .api-link:hover {
            background: #1f2937;
          }

          footer {
            margin-top: 35px;
            font-size: 14px;
            color: #9ca3af;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <h1>Internship Applicant Management API</h1>

          <div class="status">
            ● API is running
          </div>

          <p>
            Welcome to the Internship Applicant Management API.
            This system provides authentication and applicant management
            functionality for internship applications.
          </p>

          <div class="links">
            <a href="/docs" >
              📚 API Documentation
            </a>

            <a
              href="/api"
              class="api-link"
            >
              🔗 API Base URL
            </a>
          </div>

          <footer>
            Built with NestJS, TypeScript, Prisma and SQLite
          </footer>
        </div>
      </body>
      </html>
    `);
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();