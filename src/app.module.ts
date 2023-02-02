import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { StudentSchema } from './schema/student.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {dbname:'nestdb'}),
    MongooseModule.forFeature([{name:'Student', schema:StudentSchema}])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
