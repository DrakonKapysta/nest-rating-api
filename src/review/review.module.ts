import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './review.model';
import { ReviewService } from './review.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }])],
	controllers: [ReviewController],
	providers: [ReviewService],
})
export class ReviewModule {}
