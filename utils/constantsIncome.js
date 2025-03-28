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
	BANK_1: "Bank 1",
	BANK_2_L: "Bank 2 (L)",
	BANK_2_P: "Bank 2 (P)",
	/* returns */
	TAXES: "TAXES",
	MEMBERSHIP: "Membership",
	INSURANCE: "Insurance",
	OTHER: "Other returns"
}


// MAPPING TYPES TO CATEGORIES
export const TYPE_TO_CATEGORIES = {
	[INCOME_TYPES.JOBS]: ["JOBS_L", "JOBS_P"],
	[INCOME_TYPES.BANKS]: ["Bank 1", "Bank 2 (L)", "Bank 2 (P)"],
	[INCOME_TYPES.RETURNS]: ["Taxes", "Membership", "Insurance", "Other"]
}


// SORT CATEGORIES BY TYPE
export const SORT_INCOME_BY = {
	NEWEST_FIRST: "newest",
	OLDEST_FIRST: "oldest",
	BIGGEST: "biggest",
	SMALLEST: "smallest"
}