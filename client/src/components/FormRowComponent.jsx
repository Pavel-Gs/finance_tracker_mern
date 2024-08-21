// FORM ROW JSX COMPONENT
export const FormRowComponent = ({ typeProp, nameProp, labelTextProp, defaultValueProp }) => {
	return (
		<div className="form-row">
			<label className='form-label' htmlFor={nameProp}>
				{labelTextProp || nameProp}
			</label>
			<input className='form-input' type={typeProp} id={nameProp} name={nameProp} defaultValue={defaultValueProp || ""} required />
		</div>
	)
}