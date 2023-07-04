import { useEffect, useState } from 'react';
import { MainNav } from '@/components/MainNav';
import { DataTable } from './components/DataTable';
import { Columns } from './components/Columns';
import { UserNav } from './components/UserNav';
import { navigationLinks } from '../../config/navigationLinks';

export const CustomersPage = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    const response = await fetch('http://127.0.0.1:8000/customers');
    const data = await response.json();
    const transformedDataList = data.map((originalData) => ({
      id: originalData.id,
      fullname: originalData.name + " " + originalData.surname,
      email: originalData.email,
      phoneNumber: originalData.phone_number,
    }));
    setCustomerData(transformedDataList);
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
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <DataTable data={customerData} columns={Columns} />
        </div>
      </div>
    </div>
  );
};