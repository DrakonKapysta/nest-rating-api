import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';
import { Type } from 'class-transformer';

export class AdvantageDto {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AdvantageDto)
	advantages: AdvantageDto[];

	@IsString()
	inspirationText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}
