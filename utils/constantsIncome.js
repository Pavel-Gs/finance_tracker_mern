// INCOME TYPES
export const INCOME_TYPES = {
	JOBS: "Jobs",
	BANKS: "Banks",
	RETURNS: "Returns"
}


// INCOME CATEGORIES
export const INCOME_CATEGORIES = {
	/* jobs */
	JOBS_L: "Jobs (L)",
	JOBS_P: "Jobs (P)",
	/* banks */
	RBC: "RBC",
	SIMPLII_L: "Simplii (L)",
	SIMPLII_P: "Simplii (P)",
	/* returns */
	CRA: "CRA / EFT",
	COSTCO: "Costco",
	ICBC: "ICBC",
	OTHER: "Other returns"
}


// MAPPING TYPES TO CATEGORIES
export const TYPE_TO_CATEGORIES = {
	[INCOME_TYPES.JOBS]: ["JOBS_L", "JOBS_P"],
	[INCOME_TYPES.BANKS]: ["RBC", "SIMPLII_L", "SIMPLII_P"],
	[INCOME_TYPES.RETURNS]: ["CRA", "COSTCO", "ICBC", "OTHER"]
}


// SORT CATEGORIES BY TYPE
export const SORT_INCOME_BY = {
	NEWEST_FIRST: "newest",
	OLDEST_FIRST: "oldest",
	BIGGEST: "biggest",
	SMALLEST: "smallest"
}