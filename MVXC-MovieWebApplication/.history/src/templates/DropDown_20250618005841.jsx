import React from 'react'

const DropDown = ({title,options}) => {
  return (
    <div>
        
        <div className='select'>
            <select defaultValue="0" name="format" id="format">
                <option value="0" disabled
                >{title}
                </option>
                {options.map((o,i)=>{
                <option value={o} >
                        {o.toUpperCase()}
                    {title}
                </option>
                })}
            </select>
        </div>
        
        
        
        </div>
  )
}

export default DropDown