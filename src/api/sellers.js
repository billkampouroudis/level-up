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
        sizes: ['Small', 'Medium', 'Large', 'X-Large'],
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
      }
    ]
  },
  {
    id: 2,
    name: 'Caliroots',
    link:
      'https://caliroots.com/wacko-maria-x-carhartt-og-active-jacket-i028198-0d9-02/p/139954',
    stars: 4,
    address: 'Διεύθυνση, Πόλη, Χώρα',
    phone: '25510 54555',
    totalOrders: 125,
    products: [
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
          id: 2,
          name: 'Caliroots',
          link:
            'https://caliroots.com/wacko-maria-x-carhartt-og-active-jacket-i028198-0d9-02/p/139954',
          stars: 4,
          address: 'Διεύθυνση, Πόλη, Χώρα',
          phone: '25510 54555',
          totalOrders: 125
        }
      }
    ]
  }
];

const sellersApi = {
  getSellerProducts: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id) {
          const seller = sellers.filter((seller) => seller.id === id);
          if (seller.length) {
            resolve({
              data: seller
            });
          }
          reject({
            message: 'Not found'
          });
        } else {
          reject({
            message: 'No seller found'
          });
        }
      }, 500);
    });
  }
};

export default sellersApi;
