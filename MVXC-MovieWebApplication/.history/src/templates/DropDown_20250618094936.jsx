import React from 'react'

const DropDown = ({title,options}) => {
  return (
    <div>
        
        <div className='select'>
            <select o defaultValue="0" name="format" id="format">
                <option value="0" disabled
                >{title}
                </option>
                 {options.map((o,i)=> <option key={i} value={o} >
                     {o.toUpperCase()}
                    </option>
                     )}
            </select>
        </div>
        
        
        
        </div>
  )
}

export default DropDown