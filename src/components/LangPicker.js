import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
function LangPicker(props) {
  return (

    <div className="langPicker" style={{textAlign: 'right',padding:' 10px 0px'}}>
      <Select
        value={props.lang}
        onChange={props.selectLang}
      >
        <MenuItem value={'fr'}>Fr</MenuItem>
        <MenuItem value={'en'}>En</MenuItem>
      </Select>
    </div>
  )
}


export default LangPicker
