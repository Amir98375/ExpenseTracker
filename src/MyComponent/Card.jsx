import React from 'react'
import "../App.css";
export const Card = (props) => {
    console.log(props,'propscalled')
  return (
    <>
      <div className="container">
    
    
        
      
              <h3 className="heading">Total:Rs {props.income-props.expense}</h3>
              <div className="aboutTitle">
                <span>Income :Rs {props.income}</span>
                <span>Expense :Rs{props.expense}</span>
              </div>
        
    
 
   
      </div>
    </>
  )
}

