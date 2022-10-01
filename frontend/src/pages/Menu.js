import React, { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const baseurl = process.env.REACT_APP_BACKEND_API_URL;  

 const Menu = () => {
    const [dishes, setDishes] = useState([]);
    
    useEffect(() => {
      const fetchDishes = async () => {
        const response = await axios.get(`${baseurl}/api/menu/`);

        if (response.status == 200) {
            setDishes(response.data)
        }
      }
      fetchDishes();
    }, []);


    //Seperating "dishes" array into three categories
    const burger = dishes.filter(obj => {
        return obj.Category === 'Burger';
      })

    const drink = dishes.filter(obj => {
        return obj.Category === 'Drink';
      })

    const sides = dishes.filter(obj => {
        return obj.Category === 'Sides';
      })


    return ( 
        
        <div className="container-fluid ">
            <div className="row">
            <Sidebar/>
                <div className="col-2 bg-dark"></div>
                {/* Menu */}
                <div data-bs-spy="scroll" data-bs-target="#sidebar" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="col py-5 p-5 scrollspy-example rounded-2" tabIndex="0">
                    
                    {/* Menu: Burgers */}
                    <h3 id="section-1" className="p-2 text-white">Burgers </h3>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        
                    {
                        burger.map((item) => 
                            <MenuItem name={item.DishName} description={item.Description} price={item.Price} url={item.imageURL}/>
                        )
                    }
                    
                    </div>
                    {/* End of Section 1 */}


                    {/* Menu: Drinks */}
                    <h3 id="section-2" className="p-3 text-white">Drinks</h3>
                    <div className="row row-cols-1 row-cols-md-3 g-4">

                    {
                        drink.map((item) => 
                            <MenuItem name={item.DishName} description={item.Description} price={item.Price} url={item.imageURL}/>
                        )
                    }

                    </div>
                    {/* End of Section 2 */}

                    {/* Menu: Sides */}
                    <h3 id="section-3" className="p-3 text-white">Sides</h3>
                    <div className="row row-cols-1 row-cols-md-3 g-4">

                    {
                        sides.map((item) => 
                            <MenuItem name={item.DishName} description={item.Description} price={item.Price} url={item.imageURL}/>
                        )
                    }
                    
                    </div>
                     {/* End of Section 3 */}

                     
                </div>
               
            </div>
        </div>
    );
};



export default Menu;