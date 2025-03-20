export interface Purchase {
    id: number;
    date: string;
    name: string;
    cost: number;
    category: string;
    person: string;
    assignees: string[];
}


export interface Roommate {
    name: string;
    email: string;
}
  
export interface HouseholdFormData {
    householdName: string;
    roommates: Roommate[];
}

// interface for household data returned by backend
export interface HouseholdData {
  _id: string;
  householdName: string;
  roommates: { name: string; email: string }[];
}


export interface PurchaseFormData {
  date: string;
  name: string;
  cost: string; // store cost as a string initially from input
  category: string;
  person: string;
  assignees: string[];
}