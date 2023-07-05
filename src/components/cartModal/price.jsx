const Price = ({ price, discount }) => {
    return (
      <>
        {discount > 0 ? (
          <div className="gap-2 align-items-center">
            <span className="fw-semibold pe-2">
              ${(price - (price * discount) / 100).toFixed(2)}
            </span>
            <span className="color-old-price text-decoration-line-through">
              ${price.toFixed(2)}
            </span>
          </div>
        ) : (
          <span className="fw-semibold">${price.toFixed(2)}</span>
        )}
      </>
    );
  };
  
  export default Price;
  