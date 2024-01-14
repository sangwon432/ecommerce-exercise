import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  //Product 생성
  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  //product 데이터 전체 가져오기
  async getProductData() {
    const products = await this.productRepository.find();
    return products;
  }

  // 상세 product 가져오기
  async getProductById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (product) return product;
    throw new HttpException('NO PRODUCT', HttpStatus.NOT_FOUND);
  }

  async deleteProductById(id: string) {
    const deleteResponse = await this.productRepository.delete({ id });

    if (!deleteResponse.affected) {
      throw new HttpException('no product', HttpStatus.NOT_FOUND);
    }

    return `deleted ${id}`;
  }

  async updateProductById(id: string, updateProductDto: CreateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOneBy({ id });

    if (updatedProduct) return updatedProduct;
    throw new HttpException('no product', HttpStatus.NOT_FOUND);
  }
}
