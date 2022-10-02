import React from "react";
import CheckoutItem from "../components/CheckoutItem";
import CheckoutBar from "../components/CheckoutBar";

const Checkout = () => {
    return ( 
        <div class="container-fluid bg-secondary w-75 mt-3 p-3 border border-dark bg-dark rounded">
            <div class="row">
            <CheckoutBar/>
                <div /*data-bs-spy="scroll" data-bs-target="#checkoutbar" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" */class="col py-5 p-5 rounded-2" tabindex="0">
                    {/*Checkout: Cart Items */}
                    <h3 id="CheckoutItems" class="p-1 text-white">Cart Items</h3>
                    <div class="row row-cols-1 row-cols-md-4 g-3">
                        <CheckoutItem/>
                        <CheckoutItem/>
                        <CheckoutItem/>
                        <CheckoutItem/>
                    </div>
                    {/*End of Cart Items*/}


                    {/*Checkout: Payment Options & Details*/}
                    <h3 id="PaymentInput" class="p-2 mt-3 text-white">Payment Options/Details</h3>
                    <div class="row row-cols-1 row-cols-md-2 g-4 bg-light m-2 p-2 rounded">
                        <div class="gap-2  pb-3">
                            <div class="border p-2 rounded-top">
                                <input type="radio" id="Visa" name="payment_type"></input>
                                <label class="p-1" for="Visa">Visa</label>
                                <img src="./Visa_Img.png" alt="Visa Image" class="w-25 h-25"></img>
                            </div>
                            
                            <div class="border  border-top-0 border-bottom-0 p-2">
                                <input type="radio" id="Mastercard" name="payment_type"></input>
                                <label class="p-1" for="Mastercard">Mastercard</label>
                                <img src="./Mastercard_Img.jpeg" alt="Mastercard Image" class="w-25 h-25"></img>
                            </div>
                            <div class="border p-2 rounded-bottom">
                                <input type="radio" id="Paypal" name="payment_type"></input>
                                <label class="p-1" for="Paypal">Paypal</label>
                                <img src="./Paypal_Img.png" alt="Mastercard Image" class="w-25 h-25"></img>
                            </div>
                        </div>
                        <div class="">
                            <div class="p-3">
                                <label for="CardNo" class="">Card Number</label><br></br>
                                <input type="text" id="CardNo"></input>
                            </div>
                            <div class="p-3">
                                <label class="">Expiration Date</label>
                                <br></br>
                                <select id="ExpirationDay">
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <label class="p-1">/</label>
                                <select id="ExpirationYear">
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                    <option value="2031">2031</option>
                                    <option value="2032">2032</option>
                                    <option value="2033">2033</option>
                                </select>
                            </div>
                            <div class="pt-2">
                                <label for="CardNo">CSV</label>
                                <input type="text" size="3" maxLength="3" id="CardNo" class="m-2"></input>
                            </div>
                            
                        </div>
                    </div>
                    {/* End of Payment Options & Details */}

                    {/*Checkout: Address Details*/}
                    <h3 id="AddressInput" class="p-3 mt-3 text-white">Address Details</h3>
                    <div class="row row-cols-1 row-cols-md-2 g-4 m-2 p-2 bg-light rounded">
                        <div>
                            <div class="p-2">
                                <label for="AddressLine1">Street Address 1</label>
                                <br></br>
                                <input type="text" id="AddressLine1" size="40" class=""></input>
                            </div>
                            
                            <div class="p-2">
                                <label for="AddressLine2">Street Address 2</label>
                                <br></br>
                                <input type="text" id="AddressLine2" size="40" class=""></input><br></br>
                            </div>
                        </div>
                        <div>
                            <div class="p-2">
                                <label for="CityLine">City</label>
                                <br></br>
                                <input type="text" id="CityLine" class=""></input>
                            </div>
                            
                            <div class="p-2">
                                <label for="CountryLine">Country</label>
                                <br></br>
                                <input type="text" id="CountryLine" class=""></input><br></br>
                            </div>
                        </div>
                    </div> 
                    {/*End of Address Details*/}
                    
                    {/*Contact Details*/}
                    <h3 id="ContactInput" class="p-3 mt-3 text-white">Contact Details</h3>
                    <div class="row row-cols-1 row-cols-md-2 m-2 p-2 bg-light rounded">
                    <div>
                            <div class="p-2">
                                <label for="FName">First Name</label>
                                <br></br>
                                <input type="text" id="FName" class=""></input>
                            </div>
                            
                            <div class="p-2">
                            <label for="LName">Last Name</label>
                                <br></br>
                                <input type="text" id="LName" class=""></input>
                            </div>
                        </div>
                        <div>
                            <div class="p-2">
                                <label for="EmailLine">Email</label>
                                <br></br>
                                <input type="text" id="EmailLine" size="40" class=""></input>
                            </div>
                            
                            <div class="p-2">
                                <label for="PhoneLine">Phone</label>
                                <br></br>
                                <input type="text" maxLength="10" id="PhoneLine" class=""></input><br></br>
                            </div>
                        </div>
                    </div>
                    {/*End of Contact Details*/}

                    {/*Checkout: Order*/} 
                    
                    <div class="row row-cols-1 g-2 m-1">
                            <button class="btn btn-primary btn-lg btn-block" id="Order">Submit</button>
                    </div>
                     {/*End of Order*/}
                </div>
            </div>
        </div>
    );
};
export default Checkout;