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
    name: string;
    email: string;
  }