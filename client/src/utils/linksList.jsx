// IMPORT REACT
import React from 'react'
// IMPORT REACT ICONS
import { AiTwotoneMinusSquare, AiTwotonePlusSquare } from "react-icons/ai"
import { AiTwotoneMinusCircle, AiTwotonePlusCircle } from "react-icons/ai"
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs"
import { ImProfile } from 'react-icons/im'
import { MdAdminPanelSettings } from 'react-icons/md'


// LINKS LIST
export const linksList = [
	/* expenses links list */
	{
		linkText: "Add new expense",
		linkPath: '.', /* a dot here allows to navigate to a parent route (all links are relative); alternative approach is to use "/dashboard" route */
		linkIcon: <AiTwotoneMinusSquare />,
		id: crypto.randomUUID()
	},
	{
		linkText: "Search all expenses",
		linkPath: 'all-expenses',
		linkIcon: <AiTwotoneMinusCircle />,
		id: crypto.randomUUID()
	},
	{
		linkText: "expenses stats",
		linkPath: 'stats-expenses',
		linkIcon: <BsGraphDownArrow />,
		id: crypto.randomUUID()
	},
	/* separator */
	{
		linkText: <p><br></br><br></br></p>,
		id: crypto.randomUUID()
	},
	
	/* income links list */
	{
		linkText: "Add new income",
		linkPath: 'add-income',
		linkIcon: <AiTwotonePlusSquare />,
		id: crypto.randomUUID()
	},
	{
		linkText: "Search all income",
		linkPath: 'all-income',
		linkIcon: <AiTwotonePlusCircle />,
		id: crypto.randomUUID()
	},
	{
		linkText: "income stats",
		linkPath: 'stats-income',
		linkIcon: <BsGraphUpArrow />,
		id: crypto.randomUUID()
	},
	/* separator */
	{
		linkText: <p><br></br><br></br></p>,
		id: crypto.randomUUID()
	},

	/* other links list */
	{
		linkText: "profile",
		linkPath: 'profile',
		linkIcon: <ImProfile />,
		id: crypto.randomUUID()
	},
	{
		linkText: "admin",
		linkPath: 'admin',
		linkIcon: <MdAdminPanelSettings />,
		id: crypto.randomUUID()
	}
]
