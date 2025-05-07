import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

export const ProductCharacteristicSchema = SchemaFactory.createForClass(ProductCharacteristic);

@Schema({ timestamps: true })
export class ProductModel {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice: number;

	@Prop()
	credit: number;

	@Prop()
	calculatedRating: number;

	@Prop()
	description: string;

	@Prop([String])
	advantages: string[];

	@Prop([String])
	disadvantages: string[];

	@Prop([String])
	categories: string[];

	@Prop([String])
	tags: string[];

	@Prop({ type: [ProductCharacteristicSchema], _id: false })
	characteristics: ProductCharacteristic[];
}

export type ProductDocumentOverride = {
	characteristics: Types.DocumentArray<ProductCharacteristic>;
};

export type ProductDocument = HydratedDocument<ProductModel, ProductDocumentOverride>;

export const ProductShema = SchemaFactory.createForClass(ProductModel);
