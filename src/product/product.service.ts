import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from './product.model';
import { Aggregate, DeleteResult, Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from 'src/review/review.model';

export interface ProductWithReviews extends ProductModel {
	review: ReviewModel[];
	reviewCount: number;
	reviewAvg: number;
}

@Injectable()
export class ProductService {
	constructor(@InjectModel('Product') private readonly productModel: Model<ProductModel>) {}

	async create(dto: CreateProductDto): Promise<ProductModel> {
		return this.productModel.create(dto);
	}

	async findById(id: string): Promise<ProductModel | null> {
		return this.productModel.findById(id).exec();
	}

	async deleteById(id: string): Promise<ProductModel | null> {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateProductDto): Promise<ProductModel | null> {
		return this.productModel
			.findByIdAndUpdate(id, dto, {
				new: true,
			})
			.exec();
	}

	async findWithReviews(dto: FindProductDto): Promise<ProductWithReviews[]> {
		const res = await this.productModel
			.aggregate([
				{
					$match: {
						categories: { $in: [dto.category] },
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
				{ $limit: dto.limit },
				{
					$lookup: {
						from: 'reviews',
						localField: '_id',
						foreignField: 'productId',
						as: 'review',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$review' },
						reviewAvg: { $avg: '$review.rating' },
					},
				},
			])
			.exec();
		return res as ProductWithReviews[];
	}
}
