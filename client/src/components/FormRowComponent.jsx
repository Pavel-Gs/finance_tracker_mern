// FORM ROW JSX COMPONENT
export const FormRowComponent = ({ typeProp, nameProp, labelTextProp, defaultValueProp, onChangeProp }) => {
	return (
		<div className="form-row">
			<label className='form-label' htmlFor={nameProp}>
				{labelTextProp || nameProp}
			</label>
			<input className='form-input' type={typeProp} step='0.01' id={nameProp} name={nameProp} defaultValue={defaultValueProp || ""} onChange={onChangeProp} />
		</div>
	)
}