import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum TopLevelCategory {
	Courses = 'Courses',
	Services = 'Services',
	Books = 'Books',
	Products = 'Products',
}

@Schema()
export class Advantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

export const AdvantageSchema = SchemaFactory.createForClass(Advantage);

@Schema({ timestamps: true })
export class TopPageModel {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop({ unique: true })
	alias: string;

	@Prop()
	title: string;

	@Prop()
	category: string;

	@Prop({ type: [AdvantageSchema], _id: false })
	advantages: Advantage[];

	@Prop()
	inspirationText: string;

	@Prop()
	tagsTitle: string;

	@Prop([String])
	tags: string[];
}

export type TopPageDocumentOverride = {
	advantages: Types.DocumentArray<Advantage>;
};

export type TopPageDocument = HydratedDocument<TopPageModel, TopPageDocumentOverride>;

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);

TopPageSchema.index({ title: 'text', tagsTitle: 'text', 'advantages.title': 'text' });
