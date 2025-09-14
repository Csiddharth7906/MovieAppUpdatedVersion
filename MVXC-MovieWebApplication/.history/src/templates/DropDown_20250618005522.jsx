import React from 'react'

const DropDown = ({title,option}) => {
  return (
    <div>
        
        <div className='select'>
            <select defaultValue="0" name="format" id="format">
                <option value="0"
                >
                    {title}
                </option>
                {option.map((o,i)=>{
                     <option value="o" >
                    {title}
                </option>
                })}
            </select>
        </div>
        
        
        
        </div>
  )
}

export default DropDown