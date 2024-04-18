// "use client"
// import { useState, useEffect } from "react";
import styles from "./quotations.module.css";

const LatestQuotations = () => {
    // const [quotations, setQuotations] = useState([]);
  
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         console.log("Trying to fetch quotations...");
    //         const { quotations } = await fetchLatestQuotations(); // Call the prop directly
    //         setQuotations(quotations);
    //         console.log("Got fetch quotations..." + quotations);
    //       } catch (error) {
    //         console.error("Error fetching latest quotations:", error);
    //       }
    //     };
    //     fetchData();
    //   }, [fetchLatestQuotations]);
  
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Latest Quotations</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Company</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* {quotations.map((quotation) => ( */}
              {/* <tr key={quotation._id}> */}
                {/* <td>{quotation.clientName}</td>
                <td>{quotation.companyName}</td>
                <td>{quotation.createdAt}</td> 
                <td>${quotation.totalPrice}</td>  */}
            <tr>                
                <td>Test</td>
                <td>Test</td>
                <td>15-04-2024</td> {/* Adjust date format as needed */}
                <td>₹65000</td> {/* Assuming total price is available */}
              </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default LatestQuotations;
  