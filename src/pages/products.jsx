import { useEffect, useState } from "react";
import watchImg from "../../public/images/apple-watch.png";
import Button from "../components/Elements/Button";
import CardProduct from "../components/Fragments/CardProduct";
import { getProducts } from "../services/product.services";
import { getUserName } from "../services/auth.services";

// const products = [
//   {
//     id: 1,
//     title:
//       "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
//     price: 599,
//     image: watchImg,
//     description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor beatae inventore illo fugit similique, voluptate omnis nesciunt quam ipsum incidunt!,
//   },
//   {
//     id: 2,
//     title: "Apple Watch Lama",
//     price: 599,
//     image: watchImg,
//     description: Lorem ipsum dolor sit, amet consectetur adipisicing elit.,
//   },
// ];

const ProductPage = () => {
const [products, setProducts] = useState([]);
const [user, setUser] = useState("");
const handleLogout = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("password");
  localStorage.removeItem("token");
  window.location.href = "/";
};

useEffect(() => {
  getProducts((data) => {
    setProducts(data);
  });
}, []);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setUser(getUserName(token));
  } else {
    window.location.href = "/";
  }
});

return (
  <>
    <div className="flex justify-end h-12 bg-blue-600 sticky top-0 text-white items-center px-10">
      {user}
      <Button
        onClick={handleLogout}
        type="button"
        classname="ml-5 bg-black"
      >
        Logout
      </Button>
    </div>
    <div className="flex flex-wrap justify-center min-h-screen items-center mt-5">
      {products.length > 0 &&
        products.map((product) => (
          <CardProduct key={product.id}>
            <CardProduct.Header image={product.image} />
            <CardProduct.Body title={product.title}>
              {product.description}
            </CardProduct.Body>
            <CardProduct.Footer
              price={product.price}
            ></CardProduct.Footer>
          </CardProduct>
        ))}
    </div>
  </>
);
};

export default ProductPage;