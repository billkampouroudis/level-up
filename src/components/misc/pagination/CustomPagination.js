import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Pagination } from 'semantic-ui-react';

const CustomPagination = (props) => {
  return (
    <>
      {props.children}
      <div className="text-right">
        <Pagination
          size="mini"
          defaultActivePage={props.defaultActivePage || 1}
          totalPages={props.totalPages || 1}
          firstItem={null}
          lastItem={null}
          onPageChange={props.onPageChange}
        />
      </div>
    </>
  );
};

CustomPagination.propTypes = {
  onPageChange: PropTypes.func,
  children: PropTypes.node,
  defaultActivePage: PropTypes.number,
  totalPages: PropTypes.number
};

export default CustomPagination;
