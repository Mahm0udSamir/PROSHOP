import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import Product from "../components/product.component";
import { getListProduct } from "../store/products/products.action";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsReducer } from "../store/products/products.selector";
import Loader from "../components/loader.component";

const HomeScreen = () => {
  const productsSelect = useSelector(selectProductsReducer);
  const { products, loading, error } = productsSelect;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListProduct());

    // const getProducts = async () => {
    //   try {
    //     const { data } = await axios.get("/products");
    //     setProducts(data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // getProducts();
  }, [dispatch]);

  return (
    <Row>
      {loading && <Loader />}
      {error && <h2>{error}</h2>}
      {products &&
        products.map((prod) => (
          <Col lg={3} md={4} sm={6} key={prod._id}>
            <Product product={prod} />
          </Col>
        ))}
    </Row>
  );
};

export default HomeScreen;
