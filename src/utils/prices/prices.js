import get from '../misc/get';
import is from '../misc/is';
import { levels } from '../levels/levels';
import store from '../../redux/store';
import { calculateUserLevel } from '../levels/levels';

/**
 * Calculates the reduced price of a product based on the dicount level it was set for it.
 * @param {object} product
 * @param {Number} count Number of the given products in an order. By default is 1.
 * @param {number} userLevel
 */
export const getReducedPrice = (product, count = 1) => {
  const { originalPrice, discountLevel } = product;

  if (!originalPrice || !discountLevel) {
    return originalPrice;
  }

  const originalPriceNumber = Number(originalPrice);
  const reducedPrice =
    (originalPriceNumber - originalPrice * levels(discountLevel).discount) *
    count;

  return reducedPrice.toFixed(2);
};

/**
 * Calculates the cost before and after discount of a give order or collection of orders.
 * Accepts both an array of orders and a single order
 *
 * @returns {object} costs: Object with strings values of the original cost, the reduced cost and the total discount.
 * @returns {string} costs.originalCost
 * @returns {string} costs.reducedCost
 * @returns {string} costs.totalDiscount
 */
export const calculateCosts = (orders = []) => {
  const userLevel = calculateUserLevel(
    get.safe(() => store.getState().userReducer.user.xp)
  );

  let originalCost = 0;
  let reducedCost = 0;
  let totalDiscount = 0;

  // Convert orders to array if a single object was given
  if (!is.array(orders) && is.object(orders)) {
    orders = [orders];
  }

  for (let order of orders) {
    for (let orderItem of order.orderItems || []) {
      const originalProductPrice = get.safe(
        () => orderItem.product.originalPrice
      );
      const orderItemQuantity = parseInt(orderItem.quantity);
      const discountLevel = parseInt(orderItem.product.discountLevel);
      const orderItemPrice = parseFloat(orderItem.price);

      const original = originalProductPrice * orderItemQuantity;

      const reduced =
        userLevel >= discountLevel
          ? parseFloat(getReducedPrice(orderItem.product, orderItem.quantity))
          : orderItemPrice;

      originalCost += original;
      reducedCost += reduced;
    }
  }

  totalDiscount = reducedCost ? (originalCost - reducedCost).toFixed(2) : 0;
  originalCost = originalCost.toFixed(2);
  reducedCost = reducedCost ? reducedCost.toFixed(2) : originalCost;

  const costs = { originalCost, reducedCost, totalDiscount };

  return costs;
};

export const calculateRegisteredCost = (order = {}) => {
  let totalCost = 0;

  for (let orderItem of order.orderItems || []) {
    const cost = parseFloat(get.safe(() => orderItem.price));
    totalCost += cost;
  }

  return totalCost;
};
