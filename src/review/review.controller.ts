import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { User } from './../decorators/user.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto): Promise<ReviewModel> {
		return this.reviewService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(
		@Param('id', IdValidationPipe) id: string,
		@User('email') email: string,
	): Promise<void> {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
	}

	@Get('byProduct/:productId')
	async getByProduct(
		@Param('productId', IdValidationPipe) productId: string,
	): Promise<ReviewModel[]> {
		return this.reviewService.findByProductId(productId);
	}
}
