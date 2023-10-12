import React from 'react'
import { X, ArrowRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import CheckoutProductCard from '../components/CheckoutProductCard';
import { useNavigate } from 'react-router-dom';

export function Checkout() {

    const products = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const finalAmount = useSelector((state) => state.cart.finalAmount);
    const discountAmount = useSelector((state) => state.cart.discountAmount);

    const navigate = useNavigate();

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;

            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false);
            }

            document.body.appendChild(script)
        })
    }

    const handlePayment = async (amount) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            alert("Your are offline")
            return;
        }

        const options = {
            key : "rzp_test_nrHrsMJkNeOshh",
            currency: "INR",
            amount : amount,
            name: "Welcome to e-com",
            description: "Thankyou for purchasing :)",
            handler: function(response){
                alert(response.razorpay_payment_id);
                navigate(`/checkout/${response.razorpay_payment_id}`)
            },
            prefill: "Come Again",
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="mx-auto my-4 max-w-4xl md:my-6">
            <div className="overflow-hidden  rounded-xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Contact Info */}
                    <div className="px-5 py-6 text-gray-900 md:px-8">
                        <div className="flow-root">
                            <div className="-my-6 divide-y divide-gray-200">
                                <div className="py-6">
                                    <form>
                                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                                            <div>
                                                <h3
                                                    id="contact-info-heading"
                                                    className="text-lg font-semibold text-gray-900"
                                                >
                                                    Contact information
                                                </h3>

                                                <div className="mt-4 w-full">
                                                    <label
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="name"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <input
                                                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        id="name"
                                                    ></input>
                                                </div>
                                            </div>
                                            {/* <hr className="my-8" /> */}
                                            {/* <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">Payment details</h3>

                                                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                                    <div className="col-span-3 sm:col-span-4">
                                                        <label
                                                            htmlFor="cardNum"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Card number
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                type="text"
                                                                placeholder="4242 4242 4242 4242"
                                                                id="cardNum"
                                                            ></input>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2 sm:col-span-3">
                                                        <label
                                                            htmlFor="expiration-date"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Expiration date (MM/YY)
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="date"
                                                                name="expiration-date"
                                                                id="expiration-date"
                                                                autoComplete="cc-exp"
                                                                className="block h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="cvc"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            CVC
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                name="cvc"
                                                                id="cvc"
                                                                autoComplete="csc"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <hr className="my-4" />
                                            <div className="mt-4">
                                                <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>

                                                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                                    <div className="sm:col-span-3">
                                                        <label
                                                            htmlFor="address"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Address
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="address"
                                                                name="address"
                                                                autoComplete="street-address"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="city"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            City
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="city"
                                                                name="city"
                                                                autoComplete="address-level2"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="region"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            State / Province
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="region"
                                                                name="region"
                                                                autoComplete="address-level1"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="postal-code"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Postal code
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="postal-code"
                                                                name="postal-code"
                                                                autoComplete="postal-code"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-8" />
                                            <div className="mt-10">
                                                <h3 className="text-lg font-semibold text-gray-900">Billing information</h3>

                                                <div className="mt-6 flex items-center">
                                                    <input
                                                        id="same-as-shipping"
                                                        name="same-as-shipping"
                                                        type="checkbox"
                                                        defaultChecked
                                                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                    />
                                                    <div className="ml-2">
                                                        <label
                                                            htmlFor="same-as-shipping"
                                                            className="text-sm font-medium text-gray-900"
                                                        >
                                                            Same as shipping information
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                                                <button
                                                    onClick={() => handlePayment(finalAmount)}
                                                    type="button"
                                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                >
                                                    Make payment
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Product List */}
                    <div className="bg-gray-100 px-5 py-6 md:px-8">
                        <div className="flow-root">
                            <ul className="my-7 divide-y divide-gray-200">
                                {Object.keys(products).map((product) => (
                                    <CheckoutProductCard product={products[product]} />
                                ))}
                            </ul>
                            {
                                Object.keys(products).length === 0 &&
                                <div className="my-7 w-full h-full flex">
                                    <h1 className="text-[20px] leading-1">Oops ! Your Cart is Empty</h1>
                                    <button
                                        onClick={() => navigate("/page/1")}
                                        type="button"
                                        className="w-full justify-center inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                                    >
                                        Continue Shopping
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                            }
                        </div>
                        <hr className="mt-6 border-gray-200" />
                        <form action="#" className="mt-6">
                            <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                                <div className="flex-grow">
                                    <input
                                        className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Enter coupon code"
                                    />
                                </div>
                                <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                                    <button
                                        type="button"
                                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Apply Coupon
                                    </button>
                                </div>
                            </div>
                        </form>
                        <ul className="mt-6 space-y-3">
                            <li className="flex items-center justify-between text-gray-600">
                                <p className="text-sm font-medium">SUB TOTAL</p>
                                <p className="text-sm font-medium">₹ {totalAmount}</p>
                            </li>
                            <li className="flex items-center justify-between text-gray-600">
                                <p className="text-sm font-medium">TOTAL SAVINGS</p>
                                <p className="text-sm font-medium">₹ -{discountAmount}</p>
                            </li>
                            <li className="flex items-center justify-between text-gray-900">
                                <p className="text-sm font-medium ">TOTAL</p>
                                <p className="text-sm font-bold ">₹ {finalAmount}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
