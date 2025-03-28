// EXPENSES TYPES
export const EXPENSES_TYPES = {
	ALCOHOL_NICOTINE: "Alcohol & nicotine",
	FOOD: "Food",
	MONTHLY: "Monthly",
	COMMUTE: "Commute",
	HOME: "Home",
	MEDICINE: "Medicine",
	FOR_WORK: "For work",
	EDUCATION: "Education",
	RECREATIONAL: "Recreational",
	OTHER_EXPENSES: "Other expenses"
}


// EXPENSES CATEGORIES
export const EXPENSES_CATEGORIES = {
	/* alcohol & nicotine */
	ALCOHOL: "Alcohol",
	NICOTINE: "Nicotine",
	/* food */
	JUNK_FOOD: "Junk food",
	GOOD_FOOD: "Good food",
	MEMBERSHIP: "Costco membership",
	/* monthly */
	RENT: "Rent",
	LOAN: "Loan",
	ELECTRICITY: "Electricity",
	INTERNET: "Internet",
	CELLPHONE: "Cellphone",
	GYM: "Gym",
	/* commute */
	GAS: "Gas",
	TRANSPORT: "Transport",
	MAINTENANCE: "Maintenance",
	CAR_INSURANCE: "Insurance",
	CAR_OTHER: "Other (commute)",
	/* home */
	ELECTRONICS: "Electronics",
	SOFTWARE: "Software",
	FURNITURE: "Furniture",
	ACCESSORIES: "Accessories",
	PAYMENTS: "Payments",
	HOME_OTHER: "Other (for home)",
	/* medicine */
	DENTAL: "Dental",
	RECEIPTS_L: "Receipts (L)",
	RECEIPTS_P: "Receipts (P)",
	MED_OTHER: "Other (medical)",
	/* geodesy */
	EQUIPMENT_SOFT: "Equipment & soft",
	GEO_INSURANCE: "Work insurance",
	GEO_OTHER: "Other (for work)",
	/* education */
	University: "University",
	Professional: "Professional",
	ONLINE_COURSES: "Online courses",
	EDUCATION_OTHER: "Other (education)",
	/* recreational */
	TRAVEL: "For travel",
	FLIGHTS: "Flights",
	BOOKS: "Books",
	RECREATIONAL_OTHER: "Other (recreational)",
	/* other expenses */
	CLOTHES: "Clothes",
	TAXES: "Taxes",
	OTHER_EXPENSES: "Other expenses"
}


// MAPPING TYPES TO CATEGORIES
export const TYPE_TO_CATEGORIES = {
	[EXPENSES_TYPES.ALCOHOL_NICOTINE]: ["ALCOHOL", "NICOTINE"],
	[EXPENSES_TYPES.FOOD]: ["JUNK_FOOD", "GOOD_FOOD", "MEMBERSHIP"],
	[EXPENSES_TYPES.MONTHLY]: ["RENT", "LOAN", "ELECTRICITY", "INTERNET", "CELLPHONE", "GYM"],
	[EXPENSES_TYPES.COMMUTE]: ["GAS", "TRANSPORT", "MAINTENANCE", "CAR_INSURANCE", "CAR_OTHER"],
	[EXPENSES_TYPES.HOME]: ["ELECTRONICS", "SOFTWARE", "FURNITURE", "ACCESSORIES", "PAYMENTS", "HOME_OTHER"],
	[EXPENSES_TYPES.MEDICINE]: ["DENTAL", "RECEIPTS_L", "RECEIPTS_P", "MED_OTHER"],
	[EXPENSES_TYPES.FOR_WORK]: ["EQUIPMENT_SOFT", "GEO_INSURANCE", "GEO_OTHER"],
	[EXPENSES_TYPES.EDUCATION]: ["University", "Professional", "ONLINE_COURSES", "EDUCATION_OTHER"],
	[EXPENSES_TYPES.RECREATIONAL]: ["TRAVEL", "FLIGHTS", "BOOKS", "RECREATIONAL_OTHER"],
	[EXPENSES_TYPES.OTHER_EXPENSES]: ["CLOTHES", "TAXES", "OTHER_EXPENSES"]
}


// SORT EXPENSES BY TYPE
export const SORT_EXPENSES_BY = {
	NEWEST_FIRST: "newest",
	OLDEST_FIRST: "oldest",
	BIGGEST: "biggest",
	SMALLEST: "smallest"
}