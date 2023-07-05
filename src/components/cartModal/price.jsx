const Price = ({ price, discount }) => {
    return (
      <>
        {discount > 0 ? (
          <div className="d-flex gap-2 align-items-center">
            <span className="fw-semibold">
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
  