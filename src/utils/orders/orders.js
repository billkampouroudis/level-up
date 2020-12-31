import get from '../misc/get';
import is from '../misc/is';

/**
 * Calculates the cost before and after discount of a give order or collection of orders.
 *
 * @returns {object} costs: Object with strings values of the original cost, the reduced cost and the total discount.
 * @returns {string} costs.originalCost
 * @returns {string} costs.reducedCost
 * @returns {string} costs.totalDiscount
 */
export const calculateCosts = (orders = []) => {
  let originalCost = 0;
  let reducedCost = 0;
  let totalDiscount = 0;

  // Convert orders to array if a single object was given
  if (!is.array(orders) && is.object(orders)) {
    orders = [orders];
  }

  for (let order of orders) {
    for (let orderItem of order.orderItems || []) {
      const original =
        parseFloat(get.safe(() => orderItem.product.originalPrice)) *
        orderItem.quantity;
      const reduced =
        parseFloat(get.safe(() => orderItem.product.reducedPrice)) *
        orderItem.quantity;

      originalCost += is.number(original) ? original : 0;
      reducedCost += is.number(reduced) ? reduced : 0;
    }
  }

  totalDiscount = reducedCost ? (originalCost - reducedCost).toFixed(2) : 0;
  originalCost = originalCost.toFixed(2);
  reducedCost = reducedCost ? reducedCost.toFixed(2) : originalCost;

  const costs = { originalCost, reducedCost, totalDiscount };
  return costs;
};
