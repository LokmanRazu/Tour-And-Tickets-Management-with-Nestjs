import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsModule } from './tickets/tickets.module';

const config: ConfigService = new ConfigService();

@Module({

  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true

    }),
    MongooseModule.forRoot('mongodb+srv://lokmananil:123456781@cluster0.o8ya8dv.mongodb.net/?retryWrites=true&w=majority'),  




    UserModule,
    TicketsModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
