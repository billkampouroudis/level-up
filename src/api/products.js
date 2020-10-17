import makeRequest, { requestMethods } from './request';

// Images
import Product1 from '../assets/images/product1.jpg';
import Product2 from '../assets/images/product2.jpg';

export const getProducts = () => {
  const products = [
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
      seller: {
        id: 1,
        name: 'Caliroots',
        link:
          'https://caliroots.com/wacko-maria-x-carhartt-og-active-jacket-i028198-0d9-02/p/139954'
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
      seller: {
        id: 2,
        name: 'Caliroots',
        link:
          'https://caliroots.com/wacko-maria-x-carhartt-og-active-jacket-i028198-0d9-02/p/139954'
      }
    }
  ];

  // makeRequest({ method: requestMethods.GET, 'https://fakestoreapi.com/products' })
  //   .then((response) => {
  //     console.log(response.data)
  //   })
  //   .catch((error) => {
  //     console.log(error.message);
  //   });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: products });
    }, 1000);
  });
};
