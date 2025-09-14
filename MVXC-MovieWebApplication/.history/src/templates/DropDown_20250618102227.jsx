import React from 'react'

const DropDown = ({title,options,func}) => {
  return (
    <div>
        
        <div className='select'>
            <select onChange={func} defaultValue="0" name="format" id="format">
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