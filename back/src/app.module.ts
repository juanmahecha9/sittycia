import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { PrismaService } from './prisma/prisma.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpInterceptor } from './http/http.interceptor';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
    AppService,
    PrismaService,
  ],
})
export class AppModule {}
