import React from 'react'

const DropDown = ({title,options,func}) => {
  return (
    <div className="select w-full sm:w-auto min-w-0 flex-shrink">
    <select defaultValue="0" name="format" id="format" onChange={func}>
        <option value="0" disabled>
            {title}
        </option>
        {options.map((o,i)=><option key={i} value={o}>{o.toUpperCase()}</option>)}
    </select>
</div>
  )
}

export default DropDown