import React, { useEffect, useRef, useState } from "react";

import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { ReactUtilityTable } from "react-utility-table";
import { useDispatch, useSelector } from "react-redux";
import { AddTransaction, DeleteTransaction, ModifyTransaction } from "../Redux/Actions";
import "../App.css";
import { ChartMemoised } from "./Chart";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { MemoisedCard } from "./Card";
import Swal from "sweetalert2";

const Assignemnt = () => {
  const [showModel, setshowModel] = useState(false);
  const [ListType, setListType] = useState(["income", "expense"]);
  const [chartDate, setchartDate] = useState([]);
  const [chartAmount, setchartAmount] = useState([]);
  const [id,setId]=useState(null)

  const [expenseAmountList, setExpenseAmountList] = useState([]);

//expense and list later can be dynamic from database
  const [expenseList, setExpenseList] = useState(["Grocery", "Rent", "Bill"]);
  const [incomeList, setIncomeList] = useState([
    "Salary",
    "Freelance",
    "Extra Works",
  ]);

  const dispatch = useDispatch();

  const data = useSelector((state) => state.transactionList.transationList);
  const [tableData, settableData] = useState([]);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [modify,setModify]=useState(false)

  //expense tracker data later can be dynamic 
  const [formData, setFormData] = useState({
    amount: 0,
    type: "",
    category: "",
    date: "",
  });
//to Open Modal
  const handleOpen = () => {
    setModify(false)
    setFormData({ amount: 0, type: "", category: "", date: "" });
    setId(null)
    setshowModel(true);
  };

  //function to calculate monthly expenses according to date
  const calculateMonthlyExpenses = (arr) => {
    debugger;
    const monthlyExpenses = {};

    // Iterate over data
    arr.forEach((item) => {
      // Check if type is "expense"
      if (item.type === "expense") {
        const date = new Date(item.date);
        const month = date.getMonth() + 1; // Month is 0-indexed, so add 1
        const year = date.getFullYear();
        const key = `${year}-${month}`;

        // Add amount to corresponding month
        if (monthlyExpenses[key]) {
          monthlyExpenses[key] += parseInt(item.amount);
        } else {
          monthlyExpenses[key] = parseInt(item.amount);
        }
      }
    });

    const months = Object.keys(monthlyExpenses);
    const totalExpenses = Object.values(monthlyExpenses).map((amount) =>
      parseInt(amount)
    );

    setchartDate(months);
    setchartAmount(totalExpenses);
  };
  // function to submit data in redux
  const handleSubmit = (values) => {
    debugger;
    if (
      !formData.amount ||
      !formData.type ||
      !formData.category ||
      !formData.date
    ) {
      Swal.fire({
        text: "Enter all values",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          container: "swal-container",
          popup: "swal-popup",
          backdrop: "swal-backdrop",
          confirmButton: "swal-confirm-button",
        },
        onOpen: () => {
          // Get the SweetAlert popup element and set its z-index
          const swalPopup = document.querySelector(".swal-popup");
          if (swalPopup) {
            swalPopup.style.zIndex = 10000; // Set your desired z-index value here
          }
        },
      });
    } else {
      dispatch(AddTransaction(formData));
      settableData(data);
      setFormData({ amount: 0, type: "", category: "", date: "" });

      // Close the modal after submission
    }
  };

  //function to delete data from redux
  const handleDelete = (e, rowData) => {
    debugger;
    let index = rowData.tableData.id;
    dispatch(DeleteTransaction(index));
  };
//function to Modify data from redux open modal
  const handleModify=(e,rowData)=>{
setModify(true)
      setId(rowData.tableData.id)
    setFormData({
      amount: rowData.amount,
      type: rowData.type,
      category:rowData.category,
      date: rowData.date,
    
    })
    setshowModel(true)
  }

 //function to Modify data 
  const handleModifyFun=()=>{
    debugger

    if (
      !formData.amount ||
      !formData.type ||
      !formData.category ||
      !formData.date
    ){

    }else{
      dispatch(ModifyTransaction({id:id,item:formData}))
      setModify(false)
      setshowModel(false)
    }
  }
//useEffect work on data dependency whenever it will changes
  useEffect(() => {
    console.log(data, "data");
    if (data) {
      settableData(data);
      let expenseAmount = 0;
      let incomeAmount = 0;

      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "income") {
          console.log(typeof data[i].amount, "my console inside useEffect");

          incomeAmount += parseInt(data[i].amount);
        } else {
          expenseAmount += parseInt(data[i].amount);
        }
        setExpenseAmount(expenseAmount);
        setIncomeAmount(incomeAmount);
      }

      const expenseAmounts = data
        .filter((item) => item.type === "expense")
        .map((item) => item.amount);
      setExpenseAmountList(expenseAmounts);
      calculateMonthlyExpenses(data);

      console.log(incomeAmount, expenseAmount, "my amount calculate ");
    }
  }, [data]);


  //card component we are passing props after calculating amount
    //chart js component after making a list of months and amount pasing as props
  return (
    <>
      <div className="App">
      
        <div className="wrapper">
          <div className="text-center">
            <button className="button" onClick={handleOpen}>
              Transactions
            </button>
          </div>
          <div className="display-center">
            <MemoisedCard income={incomeAmount} expense={expenseAmount} />
          </div>
        </div>
        <h2>Expense Chart</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "2rem",
          }}
        > 
          <ChartMemoised expenseDate={chartDate} expenseAmount={chartAmount} />
        </div>{" "}
        <Dialog
          // fullScreen
          open={showModel}
          onClose={() => {
            setshowModel(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <div>
              <DialogContentText id="alert-dialog-description">
                <TextField
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </DialogContentText>
            </div>
            <div>
              <DialogContentText id="alert-dialog-description">
                <FormControl style={{ width: "100%" }}>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Type"
                    type="number"
                    defaultValue=""
                    helperText="Please select your type"
                    variant="standard"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    {ListType.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </DialogContentText>
            </div>
            <div>
              <DialogContentText id="alert-dialog-description">
                <FormControl style={{ width: "100%" }}>
                  <TextField
                    id="standard-select-category"
                    select
                    label="Category"
                    defaultValue=""
                    helperText="Please select your category"
                    variant="standard"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    {formData.type === "income"
                      ? incomeList.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))
                      : expenseList.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                  </TextField>
                </FormControl>
              </DialogContentText>
            </div>
            <div>
              <DialogContentText id="alert-dialog-description">
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  defaultValue=""
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </DialogContentText>
            </div>
          </DialogContent>
          <DialogActions>
            {
              modify?<Button onClick={handleModifyFun}>Modify</Button>:
              <Button onClick={handleSubmit}>Submit</Button>
            }
            
            <Button onClick={() => {
              setshowModel(false)
              setModify(false)
            }
            }>Close</Button>
          </DialogActions>
        </Dialog>
        <ReactUtilityTable
          style={{ width: "100%" }}
          title={"All Data"}
          columns={[
            {
              title: "DATE",
              type: "date",
              field: "date",
            },
            {
              title: "TYPE",
              field: "type",
            },
            {
              title: "CATEGORY",
              field: "category",
            },
            {
              title: "AMOUNT",
              field: "amount",
            },
            {
              title: "Delete",

              render: (rowData) => (
                <MdDelete
                  onClick={(e) => {
                    handleDelete(e, rowData);
                  }}
                />
              ),
            },
            {
              title:'Edit',
              render:(rowData)=>(
                <CiEdit 
                onClick={(e) => {
                  handleModify(e, rowData);
                }}
                />

               
              )
            }
          ]}
          options={{
            headerStyle: {
              backgroundColor: "#14a4de",
              color: "#FFF",
              whiteSpace: "nowrap",
              padding: 0,
            },
            rowStyle: (rowData) => ({
              color: rowData.type === "income" ? "green" : "red",
            }),
          }}
          data={tableData}
        />
      </div>
    </>
  );
};

export const MemoizedComponent = React.memo(Assignemnt);
