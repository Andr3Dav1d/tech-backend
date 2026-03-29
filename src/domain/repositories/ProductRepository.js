// Interface (contrato) para o repositório de produtos.
class ProductRepository {
  async create(product) {
    throw new Error('Method not implemented');
  }

  async findAll(params) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async update(id, product) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }

  async findFeatured() {
    throw new Error('Method not implemented');
  }
}

module.exports = ProductRepository;
