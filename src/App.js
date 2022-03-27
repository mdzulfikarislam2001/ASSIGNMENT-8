import { useEffect, useState } from "react";
import ModalView from "./Componets/Modal";

function App() {
  const [mobiles, setMobile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carts, setCart] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        setMobile(data);
        setLoading(false);
      });
  }, []);

  function showandCloseModal() {
    const body = document.querySelector("body");

    if (modalShow === false && carts.length > 0) {
      setModalShow(true);
      let choosenIndex = Math.floor(Math.random() * carts.length);
      let seletedItem = carts[choosenIndex];
      setSelectedItem(seletedItem);
      //body.style.overflow = 'hidden';

      return;
    }
    setModalShow(false);
    body.style.overflow = "auto";
  }

  return (
    <div className="App mt-10">
      <h1 className="text-5xl font-bold text-center mb-5">Mobile shop</h1>
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-span-3 grid lg:grid-cols-3 gap-3">
            {loading ? (
              <h1 className="text-5xl font-bold">Loading...</h1>
            ) : (
              mobiles.map((mobile) => (
                <div
                  key={mobile.id}
                  className="shadow-lg rounded-lg bg-white px-2 py-4 cursor-pointer"
                >
                  <img srcset={mobile.img} className="w-56 mx-auto" alt="" />
                  <div className="description my-3 text-center">
                    <p className="font-bold text-lg">Price: {mobile.price}$</p>
                    <p className="font-bold text-2xl">
                      Brand: {mobile.company}
                    </p>
                    <p className="text-secondary font-bold text-3xl">
                      {mobile.title}
                    </p>
                  </div>
                  <button
                    className="rounded-md flex uppercase bg-yellow-300 font-bold text-xl mx-auto items-center px-3 py-2 hover:from-yellow-500"
                    onClick={() => setCart([...carts, mobile])}
                  >
                    <span>Add to basket</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="cart d-flex flex-col space-y-5">
            {carts.map((cart, idx) => (
              <div className="flex mx-auto items-center flex-col" key={idx}>
                <img
                  className="w-44 lg:w-20"
                  srcSet={cart.img}
                  alt={cart.title}
                />
                <p className="lg:text-sm font-bold">{cart.title}</p>
              </div>
            ))}
            <button
              className="text-xl block mx-auto font-bold rounded px-2 border border-black"
              onClick={() => showandCloseModal()}
            >
              Choose 1 for me
            </button>
            <button
              onClick={() => setCart([])}
              className="text-xl block mx-auto font-bold rounded px-2 border border-black"
            >
              Choose Again
            </button>
          </div>
        </div>
      </div>
      <div className="content px-5">
        <div className="question-1">
          <p className="mb-3 font-bold text-2xl">What is different between State and props</p>
          <p className="text-lg"><strong>State:</strong> State is the local state of the component which cannot be accessed and modified outside of the component. It's equivalent to local variables in a function.</p>
          <p className="text-gl"><strong>Props</strong> Props, on the other hand, make components reusable by giving components the ability to receive data from their parent component in the form of props. They are equivalent to function parameters.</p>
        </div>

        <div className="question-2">
          <p className="mb-3 font-bold text-2xl">How to UseState works?</p>
          <p className="text-lg">useState is a Hook (function) that allows you to have state variables in functional components. You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state) and another function to update this value.</p>
        </div>
      </div>
      {modalShow && <ModalView item={selectedItem} modal={showandCloseModal} />}
    </div>
  );
}

export default App;
