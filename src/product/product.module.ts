import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';

@Module({
	imports: [],
	providers: [],
	controllers: [ProductController],
	exports: [],
})
export class ProductModule {}
