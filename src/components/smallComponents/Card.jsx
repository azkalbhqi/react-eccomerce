import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  const { id, title, price, description, image } = product;

  return (
    <div className="card bg-base-100 max-w-md shadow-xl">
      <figure>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-gray-600">{description.substring(0, 100)}...</p>
        <p className="text-lg font-bold text-primary">${price}</p>
        <div className="card-actions justify-end">
          {/* Link to the product details page */}
          <Link to={`/product/${id}`} className="btn btn-primary">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
