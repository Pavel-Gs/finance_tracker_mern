// INCOME TYPES
export const INCOME_TYPES = {
	JOBS: "Jobs",
	BANKS: "Banks",
	RETURNS: "Returns"
}


// INCOME CATEGORIES
export const INCOME_CATEGORIES = {
	/* jobs */
	JOBS_LENA: "Jobs (Lena)",
	JOBS_PAVEL: "Jobs (Pavel)",
	/* banks */
	RBC: "RBC",
	SIMPLII_LENA: "Simplii (Lena)",
	SIMPLII_PAVEL: "Simplii (Pavel)",
	/* returns */
	CRA: "CRA / EFT",
	COSTCO: "Costco",
	ICBC: "ICBC"
}


// MAPPING TYPES TO CATEGORIES
export const TYPE_TO_CATEGORIES = {
	[INCOME_TYPES.JOBS]: ["JOBS_LENA", "JOBS_PAVEL"],
	[INCOME_TYPES.BANKS]: ["RBC", "SIMPLII_LENA", "SIMPLII_PAVEL"],
	[INCOME_TYPES.RETURNS]: ["CRA", "COSTCO", "ICBC"]
}


// SORT CATEGORIES BY TYPE
export const SORT_INCOME_BY = {
	NEWEST_FIRST: "newest",
	OLDEST_FIRST: "oldest",
	BIGGEST: "biggest",
	SMALLEST: "smallest"
}