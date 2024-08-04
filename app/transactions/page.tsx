'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TransactionsComponent from "./Transactions"
import { FaChevronDown } from "react-icons/fa";


const Transactions = () => {

    const [selectedItem, setSelectedItem] = React.useState('Today');
  
    const handleSelect = (item : any) => {
      setSelectedItem(item);
    };

  return (
    <>
   <div className="my-6">
   <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center p-2 gap-5 mx-auto">
          <Button variant="outline" className="w-36 bg-red-50">
            {selectedItem}
          </Button>
          <FaChevronDown className="size-5 -ml-7 pr-2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Pick the date</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedItem === 'Today'}
          onCheckedChange={(checked) => checked && handleSelect('Today')}
        >
          Today
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedItem === 'This Week'}
          onCheckedChange={(checked) => checked && handleSelect('This Week')}
        >
          This Week
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedItem === 'This Month'}
          onCheckedChange={(checked) => checked && handleSelect('This Month')}
        >
          This Month
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedItem === 'All'}
          onCheckedChange={(checked) => checked && handleSelect('All')}
        >
          All
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
   </div>
    <TransactionsComponent/>
    </>
  )
}

export default Transactions