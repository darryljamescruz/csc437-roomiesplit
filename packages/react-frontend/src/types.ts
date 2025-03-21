export interface Purchase {
    id: string;
    date: string;
    name: string;
    cost: number;
    category: string;
    person: string;
    assignees: string[];
  }
  
// Interface for data coming from the Purchase form
export interface PurchaseFormData {
  date: string;
  name: string;
  cost: string; // cost is a string from the input, then parsed to a number
  category: string;
  person: string;
  assignees: string[];
}

export interface Roommate {
    name: string;
    email: string;
}

export interface HouseholdFormData {
    name: string;
    email: string;
  }