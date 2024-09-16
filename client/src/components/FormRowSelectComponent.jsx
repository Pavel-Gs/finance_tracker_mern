// FORM SELECT JSX COMPONENT
export const FormRowSelectComponent = ({ nameProp, labelTextProp, listProp, defaultValueProp = "" }) => {
	return (
		<div className="form-row">
			<label className='form-label' htmlFor={nameProp}>
				{labelTextProp || nameProp}
			</label>
			<select className='form-select' name={nameProp} id={nameProp} defaultValue={defaultValueProp}>
				{listProp.map((i) => {
					return (
						<option key={i} value={i}>
							{i}
						</option>
					)
				})}
			</select>
		</div>
	)
}
