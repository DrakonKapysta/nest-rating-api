import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthShema } from './auth.model';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Auth', schema: AuthShema }])],
	controllers: [AuthController],
})
export class AuthModule {}
