import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";
import { useState } from "react";

export const AddCustomerPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const getName = (event) => {
    setName(event.target.value);
  };

  const getSurname = (event) => {
    setSurname(event.target.value);
  };
  const getEmail = (event) => {
    setEmail(event.target.value);
  };
  const getPhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

const submitFormHandler = async (e) => {
  e.preventDefault();
  if (name === "") return;
  if (email === "") return;
  if (phoneNumber === "" || phoneNumber.length !== 9) return;

  const customerData = {
    name: name,
    surname: surname,
    email: email,
    phone_number: phoneNumber,
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/customers", {
      method: "POST",
      body: JSON.stringify(customerData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Customer added successfully");
      setName("");
      setSurname("");
      setEmail("");
      setPhoneNumber("");
    } else {
      console.log("Error adding customer");
    }
  } catch (error) {
    console.log("Error:", error);
  }

  console.log("Submit button clicked");
};
  return (
  <div className="hidden flex-col md:flex">
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" links={navigationLinks} />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add customer</h2>
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex"></div>
    </div>
    <form onSubmit={submitFormHandler} className="addCustomerForm">
      <div className="flex flex-col">
        <label>name</label>
        <input
          onChange={getName}
          value={name}
          placeholder="Frodo"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label>surname</label>
        <input
          onChange={getSurname}
          value={surname}
          placeholder="Baggins"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label>Email</label>
        <input
          onChange={getEmail}
          value={email}
          placeholder="contact@hobbits.com"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label>PhoneNumber</label>
        <input
          onChange={getPhoneNumber}
          value={phoneNumber}
          placeholder="911 2001"
          type="text"
        />
      </div>
      <button type="submit" style={{ backgroundColor: "magenta" }}>Submit</button>

    </form>
  </div>
);
};