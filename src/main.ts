import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: `http://localhost:${process.env.PORT}`,
      credentials: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const port = process.env.PORT;
  await app.listen(port);
}
bootstrap();
