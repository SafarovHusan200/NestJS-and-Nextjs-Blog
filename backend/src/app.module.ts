import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BlogModule,
    MongooseModule.forRoot(
      'mongodb+srv://safarovhusandev:BdryNwqBZH64nLzp@husan.payawam.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
