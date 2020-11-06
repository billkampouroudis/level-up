// import makeRequest, { requestMethods } from './request';

// Images
import Product1 from '../assets/images/product1.jpg';
import Product2 from '../assets/images/product2.jpg';

const sellers = [
  {
    id: 1,
    name: 'Caliroots',
    link:
      'https://caliroots.com/wacko-maria-x-carhartt-og-active-jacket-i028198-0d9-02/p/139954',
    stars: 3,
    ratings: 25,
    description:
      'Mauris a auctor dolor, non ornare est. Praesent tellus sem, malesuada volutpat fringilla id, tempus ut erat. Phasellus metus velit, rhoncus sit amet rutrum posuere, elementum et elit. Vestibulum dolor leo, vehicula at mollis in, ultrices ut libero. Pellentesque nibh ligula, fermentum quis ex eget, consequat iaculis quam. Vestibulum vehicula nunc in nunc commodo, eu venenatis lectus scelerisque.',
    address: 'Διεύθυνση, Πόλη, Χώρα',
    phone: '25510 33464',
    totalOrders: 125,
    products: [
      {
        id: 1,
        image: Product1,
        name: 'x Wacko Maria OG Active Jacket',
        description:
          'This is an extremely good jacket and you should buy it immediately',
        stars: 4,
        ratings: 12,
        originalPrice: 409.9,
        reducedPrice: 350.0,
        discountLevel: 12,
        sizes: ['S', 'M', 'L', 'XL'],
        isFavorite: true,
        seller: {
          id: 1,
          name: 'Caliroots',
          link:
            'https://caliroots.com/wacko-maria-x-carhartt-og-active-jacket-i028198-0d9-02/p/139954',
          stars: 3,
          address: 'Διεύθυνση, Πόλη, Χώρα',
          phone: '25510 33464',
          totalOrders: 125
        }
      },
      {
        id: 2,
        image: Product2,
        name: 'Vans Era',
        description: `Color: Port Royale
        VN0A4BV45U7
        Material
        Upper: Textile
        Lining & Insole: Textile
        Outsole: Other material`,
        stars: 4.5,
        ratings: 8,
        originalPrice: 69.9,
        reducedPrice: 60.0,
        discountLevel: 2,
        sizes: ['38', '39', '40', '41', '42'],
        isFavorite: false,
        seller: {
          id: 1,
          name: 'Caliroots',
          stars: 3
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Test',
    link: 'test@test.test',
    stars: 4,
    ratings: 25,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum, sem ac fermentum sagittis, lectus turpis mattis nisl, et dictum libero justo in neque. In hac habitasse platea dictumst. Duis tempus est eget quam laoreet, in accumsan tortor suscipit. Nunc eget tellus scelerisque, semper erat in, tristique tortor.',
    address: 'Διεύθυνση, Πόλη, Χώρα',
    phone: '25510 12312',
    totalOrders: 300,
    products: [
      {
        id: 3,
        image: Product2,
        name: 'Vans Era',
        description: `Color: Port Royale
        VN0A4BV45U7
        Material
        Upper: Textile
        Lining & Insole: Textile
        Outsole: Other material`,
        stars: 4.5,
        ratings: 8,
        originalPrice: 69.9,
        reducedPrice: 60.0,
        discountLevel: 2,
        sizes: ['38', '39', '40', '41', '42'],
        isFavorite: false,
        seller: {
          id: 2,
          name: 'Test',
          stars: 3
        }
      }
    ]
  }
];

const sellersApi = {
  getSellers: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = [];
        if (id) {
          result = sellers.filter((seller) => seller.id === id);
        } else {
          result = sellers;
        }

        if (result.length) {
          resolve({
            data: result
          });
        }
        reject({
          message: 'Not found'
        });
      }, 200);
    });
  }
};

export default sellersApi;
