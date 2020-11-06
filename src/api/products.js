// import makeRequest, { requestMethods } from './request';

// Images
import Product1 from '../assets/images/product1.jpg';
import Product2 from '../assets/images/product2.jpg';

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
  },
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
];

const productsApi = {
  getProducts: (id, options) => {
    // makeRequest({ method: requestMethods.GET, 'https://fakestoreapi.com/products' })
    //   .then((response) => {
    //     console.log(response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id) {
          const product = products.filter((product) => product.id === id);
          if (product.length) {
            resolve({
              data: product
            });
          }
          reject({
            message: 'Not found'
          });
        } else {
          resolve({ data: products });
        }
      }, 200);
    });
  },

  addToFavorites: (id) => {
    // makeRequest({ method: requestMethods.GET, 'https://fakestoreapi.com/products' })
    //   .then((response) => {
    //     console.log(response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find((product) => product.id === id);
        product.isFavorite = !product.isFavorite;
        resolve({
          data: product
        });
      }, 200);
    });
  }
};

export default productsApi;
