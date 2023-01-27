import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./rating.component";

const Product = ({ product }) => {
  return (
    <Card className="my-3 rounded" style={{ minHeight: "401px" }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>
        <Card.Text style={{ paddingBottom: "0" }} as="h3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
