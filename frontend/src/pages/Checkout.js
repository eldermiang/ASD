import React from "react";
import { useState } from "react"
import CheckoutItem from "../components/CheckoutItem";
import CheckoutBar from "../components/CheckoutBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from 'react-redux';
import { decryptData } from "../utility/Functions";
import { clearItems } from "../redux/cart";
import axios from "axios";

const baseurl = process.env.REACT_APP_BACKEND_API_URL;

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { user } = useAuth0();



    
    const [User_ID, setUserID] = useState('')
    const [Payment_Type, setPaymentType] = useState('')
    const [Card_No, setCardNo] = useState('')
    const [card_ExpMM, setCardExpMM] = useState('')
    const [card_ExpYYYY, setCardExpYYYY] = useState('')
    const [Card_Exp, setCardExp] = useState('')
    const [Card_CSV, setCardCSV] = useState('')
    const [Address_One, setAddOne] = useState('')
    const [Address_Two, setAddTwo] = useState('')
    const [Address_City, setAddCity] = useState('')
    const [Address_Country, setAddCountry] = useState('')
    const [Contact_FName, setFName] = useState('')
    const [Contact_SName, setSName] = useState('')
    const [Contact_Email, setEmail] = useState('')
    const [Contact_Phone, setPhone] = useState('')
    const [error, setError] = useState(null)
    
    //const [Item_ID, setItemID] = useState("")
    //const [Item_Name, setItemName] = useState("")
    //const [Item_Quantity, setItemQuantity] = useState("")
    //const [Item_Price, setItemPrice] = useState("")

    let Items = {
        'Item_ID': '11111',
        'Item_Name': 'BurgerTest',
        'Item_Quantity': '3',
        'Item_Price': '21.00'
    }
    // Initialising Items object array
    /*const [Items = [{
        Item_ID,
        Item_Name,
        Item_Quantity,
        Item_Price
    }], setItem] = useState(setItemID(""), setItemName(""), setItemQuantity(""), setItemPrice(""));*/

    const salt = process.env.REACT_APP_SALT;
    const coupon = localStorage.getItem("coupon");
    if (coupon) {
      var decryptedCoupon = decryptData(coupon, salt);
      //If coupon is modified
      if (!decryptedCoupon) {
        decryptedCoupon = [];
      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Calculate total price from cart items
        var total_price = 0
        cartItems.forEach(item => {
            total_price += item.price;
            if (item.extra) {
                item.extra.forEach(extra => {
                    total_price += extra.price;
                })
            }
        });
        //Apply coupon if it exists
        if (decryptedCoupon) {
            total_price *= decryptedCoupon.rate;
        }
        
        
        // Moving items from cart into Items array
        /*const iterator = 0;
        cartItems.forEach(item => {
            //setItem(item.id, item.name, item.quantity, item.price)
            //Items[iterator].Item_ID = item.id;
            //Items[iterator].Item_Name = item.name;
            //Items[iterator].Item_Quantity = item.quantity;
            //Items[iterator].Item_Price = item.price;
            //iterator += 1;
        })*/

        setUserID(user.email)
        setCardExp(card_ExpMM.concat("/", card_ExpYYYY))
        const recipt = {User_ID, Payment_Type, Card_No, Card_Exp, Card_CSV, Address_One, Address_Two, Address_City, Address_Country, Contact_FName, Contact_SName, Contact_Email, Contact_Phone, Items, total_price}

        const response = await fetch(`${baseurl}/api/recipts`, {
            method: 'POST',
            body: JSON.stringify(recipt),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            if (decryptedCoupon) {
                try {
                    const res = await axios.patch(`${baseurl}}/api/profile/coupon/${User_ID}`, decryptedCoupon);
                    console.log(res);
                } catch (error) {
                    console.log(error);
                }
            }

            setUserID('')
            setPaymentType('')
            setCardNo('')
            setCardExpMM('')
            setCardExpYYYY('')
            setCardExp('')
            setCardCSV('')
            setAddOne('')
            setAddTwo('')
            setAddCity('')
            setAddCountry('')
            setFName('')
            setSName('')
            setEmail('')
            setPhone('')
            //setItems(null)
            setError(null)
            console.log('new recipt added', json)
            dispatch(clearItems());
            localStorage.clear();
            window.location.href = "/menu"
        }
    }

    return ( 
        <div className="container-fluid bg-secondary w-75 mt-3 p-3 border border-dark bg-dark rounded">
            <div className="row">
            <CheckoutBar/>
                <form className="create" onSubmit={handleSubmit}>
                    <div /*data-bs-spy="scroll" data-bs-target="#checkoutbar" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" */className="col py-5 p-5 rounded-2" tabIndex="0">

                        {/*Checkout: Payment Options & Details*/}
                        <h3 id="PaymentInput" className="p-2 mt-3 text-white">Payment Options/Details</h3>
                        <div className="row row-cols-1 row-cols-md-2 g-4 bg-light m-2 p-2 rounded">
                            <div className="gap-2  pb-3">
                                <div className="border p-2 rounded-top">
                                    <input type="radio" id="Visa" name="payment_type"
                                        onChange={(e) => setPaymentType("visa")}
                                    />
                                    <label className="p-1" htmlFor="Visa">Visa</label>
                                    <img src="./Visa_Img.png" alt="Visa Image" className="w-25 h-25"></img>
                                </div>
                                
                                <div className="border  border-top-0 border-bottom-0 p-2">
                                    <input type="radio" id="Mastercard" name="payment_type"
                                        onChange={(e) => setPaymentType("Mastercard")}
                                    />
                                    <label className="p-1" htmlFor="Mastercard">Mastercard</label>
                                    <img src="./Mastercard_Img.jpeg" alt="Mastercard Image" className="w-25 h-25"></img>
                                </div>
                            </div>

                            <div>
                                <div className="p-3">
                                    <label htmlFor="CardNo" className="">Card Number</label><br></br>
                                    <input type="text" id="CardNo"
                                        onChange={(e) => setCardNo(e.target.value)}
                                        value={Card_No}
                                    />
                                </div>
                                <div className="p-3">
                                    <label className="">Expiration Date</label>
                                    <br></br>
                                    <select id="ExpirationDay" data-testid="ExpMM" onChange={(e) => setCardExpMM(e.target.value)}
                                        value={card_ExpMM}>
                                        <option data-testid="ExpMMArray" value="01">01</option>
                                        <option data-testid="ExpMMArray" value="02">02</option>
                                        <option data-testid="ExpMMArray" value="03">03</option>
                                        <option data-testid="ExpMMArray" value="04">04</option>
                                        <option data-testid="ExpMMArray" value="05">05</option>
                                        <option data-testid="ExpMMArray" value="06">06</option>
                                        <option data-testid="ExpMMArray" value="07">07</option>
                                        <option data-testid="ExpMMArray" value="08">08</option>
                                        <option data-testid="ExpMMArray" value="09">09</option>
                                        <option data-testid="ExpMMArray" value="10">10</option>
                                        <option data-testid="ExpMMArray" value="11">11</option>
                                        <option data-testid="ExpMMArray" value="12">12</option>
                                    </select>
                                    <label className="p-1">/</label>
                                    <select id="ExpirationYear" data-testid="ExpYYYY" onChange={(e) => setCardExpYYYY(e.target.value)}
                                        value={card_ExpYYYY}>
                                        <option data-testid="ExpYYYYArray" value="2022">2022</option>
                                        <option data-testid="ExpYYYYArray" value="2023">2023</option>
                                        <option data-testid="ExpYYYYArray" value="2024">2024</option>
                                        <option data-testid="ExpYYYYArray" value="2025">2025</option>
                                        <option data-testid="ExpYYYYArray" value="2026">2026</option>
                                        <option data-testid="ExpYYYYArray" value="2027">2027</option>
                                        <option data-testid="ExpYYYYArray" value="2028">2028</option>
                                        <option data-testid="ExpYYYYArray" value="2029">2029</option>
                                        <option data-testid="ExpYYYYArray" value="2030">2030</option>
                                        <option data-testid="ExpYYYYArray" value="2031">2031</option>
                                        <option data-testid="ExpYYYYArray" value="2032">2032</option>
                                        <option data-testid="ExpYYYYArray" value="2033">2033</option>
                                    </select>
                                </div>
                                <div className="pt-2">
                                    <label htmlFor="CardNo">CSV</label>
                                    <input type="text" size="3" maxLength="3" id="CardNo" className="m-2"
                                        onChange={(e) => setCardCSV(e.target.value)}
                                        value={Card_CSV}/>
                                </div>
                                
                            </div>
                        </div>
                        {/* End of Payment Options & Details */}

                        {/*Checkout: Address Details*/}
                        <h3 id="AddressInput" className="p-3 mt-3 text-white">Address Details</h3>
                        <div className="row row-cols-1 row-cols-md-2 g-4 m-2 p-2 bg-light rounded">
                            <div>
                                <div className="p-2">
                                    <label htmlFor="AddressLine1">Street Address 1</label>
                                    <br></br>
                                    <input type="text" id="AddressLine1" size="40"
                                        onChange={(e) => setAddOne(e.target.value)}
                                        value={Address_One}
                                    />
                                </div>
                                
                                <div className="p-2">
                                    <label htmlFor="AddressLine2">Street Address 2</label>
                                    <br></br>
                                    <input type="text" id="AddressLine2" size="40"
                                        onChange={(e) => setAddTwo(e.target.value)}
                                        value={Address_Two}/>
                                    <br></br>
                                </div>
                            </div>
                            <div>
                                <div className="p-2">
                                    <label htmlFor="CityLine">City</label>
                                    <br></br>
                                    <input type="text" id="CityLine"
                                        onChange={(e) => setAddCity(e.target.value)}
                                        value={Address_City}
                                    />
                                </div>
                                
                                <div className="p-2">
                                    <label htmlFor="CountryLine">Country</label>
                                    <br></br>
                                    <input type="text" id="CountryLine" 
                                        onChange={(e) => setAddCountry(e.target.value)}
                                        value={Address_Country}
                                    />
                                    <br></br>
                                </div>
                            </div>
                        </div> 
                        {/*End of Address Details*/}
                        
                        {/*Contact Details*/}
                        <h3 id="ContactInput" className="p-3 mt-3 text-white">Contact Details</h3>
                        <div className="row row-cols-1 row-cols-md-2 m-2 p-2 bg-light rounded">
                        <div>
                                <div className="p-2">
                                    <label htmlFor="FName">First Name</label>
                                    <br></br>
                                    <input type="text" id="FName"
                                        onChange={(e) => setFName(e.target.value)}
                                        value={Contact_FName}
                                    />
                                </div>
                                
                                <div className="p-2">
                                <label htmlFor="LName">Last Name</label>
                                    <br></br>
                                    <input type="text" id="LName"
                                        onChange={(e) => setSName(e.target.value)}
                                        value={Contact_SName}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="p-2">
                                    <label htmlFor="EmailLine">Email</label>
                                    <br></br>
                                    <input type="text" id="EmailLine" size="40"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={Contact_Email}
                                    />
                                </div>
                                
                                <div className="p-2">
                                    <label htmlFor="PhoneLine">Phone</label>
                                    <br></br>
                                    <input type="text" maxLength="10" id="PhoneLine"
                                        onChange={(e) => setPhone(e.target.value)}
                                        value={Contact_Phone}
                                    />
                                    <br></br>
                                </div>
                            </div>
                        </div>
                        {/*End of Contact Details*/}

                        {/*Checkout: Order*/} 
                        
                        <div className="row row-cols-1 g-2 m-1">
                                <button className="btn btn-primary btn-lg btn-block" id="Order">Submit</button>
                                
                        </div>
                        {/*End of Order*/}
                    </div>
                </form>
            </div>
        </div>
    ); 
};
export default Checkout;