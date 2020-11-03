const is = {
  falsy: (item) => {
    return (
      item === 'undefined' ||
      item === null ||
      item === 0 ||
      item === '' ||
      item === ' ' ||
      item === [] ||
      item === {} ||
      item === false ||
      item === NaN
    );
  },
  truthy: (item) => {
    return !is.falsy(item);
  },
  notEmptyObject: (item) => {
    return item && item.constructor === Object && Object.keys(item).length > 0;
  },
  emptyObject: (item) => {
    return !is.notEmptyObject(item);
  }
};

export default is;
