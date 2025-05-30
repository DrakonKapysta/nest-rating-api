import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';

export class ProductCharacteristic {
	@IsString()
	name: string;
	@IsString()
	value: string;
}

export class CreateProductDto {
	@IsString()
	image: string;

	@IsString()
	title: string;

	@IsNumber()
	price: number;

	@IsOptional()
	@IsNumber()
	oldPrice?: number;

	@IsNumber()
	credit: number;

	@IsString()
	description: string;

	@IsString()
	advantages: string;

	@IsString()
	disadvantages: string;
	@IsArray()
	@IsString({ each: true })
	categories: string[];

	@IsArray()
	@IsString({ each: true })
	tags: string[];

	@IsArray()
	@ValidateNested()
	@Type(() => ProductCharacteristic)
	characteristics: ProductCharacteristic[];
}
