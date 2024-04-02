import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { Form, Input, Modal, Select } from "antd";
import { ReactUtilityTable } from "react-utility-table";
import { useDispatch, useSelector } from "react-redux";
import { AddTransaction } from "../Redux/Actions";
import '../App.css';
import BarChart from "./Chart";

const Assignemnt = () => {

  const [showModel, setshowModel] = useState(false);
  const [incomeList, setIncomeList] = useState([
    "Salary",
    "Freelance",
    "Extra Works",
  ]);
  const [expenseList, setExpenseList] = useState(["Grocery", "Rent", "Bill"]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.transactionList.transationList);
  const [tableData, settableData] = useState([]);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);

  const [formData, setFormData] = useState({
    amount: 0,
    type: "",
    category: "",
    date: "",
  });

  const handleOpen = () => {
    setshowModel(true);
  };

  const handleSubmit = (e) => {
    
    debugger;
    if (
      !formData.amount ||
      !formData.type ||
      !formData.category ||
      !formData.date
    ) {
      alert("Enter all fields");
    } else {
      dispatch(AddTransaction(formData));
      settableData(data);
      setFormData({ amount: 0, type: "", category: "", date: "" });
     // Close the modal after submission
    }
  };

  useEffect(() => {
    console.log(data,"data")
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

      console.log(incomeAmount, expenseAmount, "my amount calculate ");
    }
  }, [data]);

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>

   <div className="App">
   <button className="button" onClick={handleOpen}>
        Transactions
      </button>
      <br />
    
      <Card income={incomeAmount} expense={expenseAmount} />
      <BarChart/>
   <br />
      <Modal
        title="Add Transactions"
        visible={showModel}
        onCancel={() => setshowModel(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formData}
        >
          <Form.Item label="Amount" name="amount" type='number'>
            <Input
              type="number"
              onChange={(e) => handleChange("amount", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select onChange={(value) => handleChange("type", value)}>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select onChange={(value) => handleChange("category", value)}>
              {formData.type === "income"
                ? incomeList.map((el, index) => (
                    <Select.Option value={el} key={index}>{el}</Select.Option>
                  ))
                : expenseList.map((el, index) => (
                    <Select.Option value={el} key={index}>{el}</Select.Option>
                  ))}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" onChange={(e) => handleChange("date", e.target.value)} />
          </Form.Item>
          
          <div className="d-flex justify-content-end">
            <button className="button" type="submit"> SAVE</button>
          </div>
        </Form>
     
      </Modal>

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
