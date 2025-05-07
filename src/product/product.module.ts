import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductShema } from './product.model';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductShema }])],
	providers: [],
	controllers: [ProductController],
	exports: [],
})
export class ProductModule {}
