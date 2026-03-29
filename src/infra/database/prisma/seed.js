const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Create Categories
  const category1 = await prisma.category.create({
    data: {
      name: 'Laptops',
      slug: 'laptops',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Smartphones',
      slug: 'smartphones',
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: 'Acessórios',
      slug: 'acessorios',
    },
  });

  // Create Products
  await prisma.product.createMany({
    data: [
      // Laptops
      {
        name: 'Super Laptop Pro',
        description: 'O laptop mais potente para profissionais.',
        price: 14999.99,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 10,
        featured: true,
        categoryId: category1.id,
      },
      {
        name: 'Laptop Gamer X',
        description: 'Performance extrema para seus jogos.',
        price: 9999.99,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 5,
        featured: true,
        categoryId: category1.id,
      },
      {
        name: 'Laptop Essencial',
        description: 'Ideal para estudos e trabalho do dia a dia.',
        price: 3999.99,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 20,
        categoryId: category1.id,
      },
      // Smartphones
      {
        name: 'Smartphone Ultra',
        description: 'Câmera de 200MP e tela infinita.',
        price: 7999.99,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 15,
        featured: true,
        categoryId: category2.id,
      },
      {
        name: 'Smartphone Plus',
        description: 'Bateria que dura o dia todo e mais um pouco.',
        price: 4999.99,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 30,
        categoryId: category2.id,
      },
      // Acessórios
      {
        name: 'Mouse Sem Fio',
        description: 'Precisão e conforto para seu setup.',
        price: 299.99,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 50,
        categoryId: category3.id,
      },
      {
        name: 'Teclado Mecânico RGB',
        description: 'Switches de alta performance e iluminação customizável.',
        price: 799.99,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 25,
        featured: true,
        categoryId: category3.id,
      },
      {
        name: 'Headset Gamer 7.1',
        description: 'Imersão total com som surround.',
        price: 899.99,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 15,
        categoryId: category3.id,
      },
      {
        name: 'Monitor 4K Ultrawide',
        description: 'Produtividade e imersão em um só monitor.',
        price: 3499.99,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 8,
        categoryId: category1.id, // ou Acessórios
      },
      {
        name: 'Capa de Couro para Smartphone',
        description: 'Proteção com estilo e elegância.',
        price: 199.99,
        imageUrl: 'https://via.placeholder.com/150',
        stock: 100,
        categoryId: category3.id,
      },
    ],
  });

  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@techstore.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
