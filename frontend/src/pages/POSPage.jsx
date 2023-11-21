import React, {useEffect, useRef, useState} from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';

function POSPage() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]); 
  const [totalAmount, setTotalAmount] = useState(0);
  
  const toastOptions = {
    autoClose: 500,
    pauseOHoever: true,
  }

  const addToCart = async(product) => {
    let findProductInCart = cart.find(i => i.id === product.id);

    if(findProductInCart) {
        let newCart = cart.map(cartItem => {
            if(cartItem.id === product.id){
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                    totalAmount: cartItem.price * (cartItem.quantity + 1)
                };
            }
            return cartItem;
        });

        setCart(newCart);
        toast(`Added ${newCart}.name} to cart`,toastOptions);
        
    } else {
        let addingProduct = {
            ...product,
            quantity: 1,
            totalAmount: product.price
        }
        setCart([...cart, addingProduct]);
        toast(`Added ${product.name} to cart`,toastOptions)
    }
  };

  const fetchProducts = async() => {
    setIsLoading(true);
    try {
      const result = await axios.get('products');
      setProducts(result.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setIsLoading(false);
  };

  const removeProduct = async(product) =>{
    const newCart =cart.filter(cartItem => cartItem.id !== product.id);
    setCart(newCart);
  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();

  }

  useEffect(() =>{
    fetchProducts();
  },[]);

  useEffect(() =>{
    let newTotalAmount = 0;
    cart.forEach(icart => {
        newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    })
    setTotalAmount(newTotalAmount);
  }, [cart])

  return (
    <MainLayout>
       <div className='row'>
        <div className='col-lg-8'>
            {isLoading ? 'Loading' : <div className='row'>
                {products.map((product, key) =>
                    <div key ={key} className='col-lg-4 mb-4'>
                        <div className='pos-item px-3 text-center border' onClick={() => addToCart(product)}>
                            <p>{product.name}</p>
                            <img src={product.image} className='img-fluid' alt={product.name} />
                            <p>${product.price}</p>
                            </div>
                    </div>
                )}
                </div>}
         
        </div>
        <div className='col-lg-4'>
            <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>

            </div>
            <div className= 'table-responsive bg-dark'>
                <table className='table table-responsive table-dark table-hover'>
                    <thead>
                        <tr>
                            <d>#</d>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Qty</td>
                            <td>Total</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        { cart ? cart.map((cartProduct, key) => <tr key={key}>
                            <td>{cartProduct.id}</td>
                            <td>{cartProduct.name}</td>
                            <td>{cartProduct.price}</td>
                            <td>{cartProduct.quantity}</td>
                            <td>{cartProduct.totalAmount}</td>
                            <td>
                                <buttonn className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</buttonn>
                            </td>
                        </tr>)
                        : 'No Item in Cart'}
                    </tbody>
                </table>
                <h2 className='px-2 text-white'>Total Amount: ${totalAmount}</h2>
            </div>

            <div className='mt-3'>
                {totalAmount !== 0 ? <div>
                    <button className='btn btn-primary' onClick={handlePrint}>
                        Pay Now
                    </button>


                </div> : 'Please Add a Drink to the Cart'
                }

            </div>
        </div>
        </div>
    </MainLayout>
  )
}

export default POSPage