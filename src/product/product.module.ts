import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductShema } from './product.model';
import { ProductService } from './product.service';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductShema }])],
	providers: [ProductService],
	controllers: [ProductController],
	exports: [],
})
export class ProductModule {}
