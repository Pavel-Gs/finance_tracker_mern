// FORM SELECT JSX COMPONENT
export const FormRowSelectComponent = ({ nameProp, labelTextProp, listProp, defaultValueProp = "", disabledProp = false, onChangeProp }) => {
	return (
		<div className="form-row">
			<label className='form-label' htmlFor={nameProp}>
				{labelTextProp || nameProp}
			</label>
			<select className='form-select' name={nameProp} id={nameProp} defaultValue={defaultValueProp} disabled={disabledProp} onChange={onChangeProp} required>

				{/* add a placeholder option with an empty value */}
				<option value="" disabled>
					Select {labelTextProp}
				</option>

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
