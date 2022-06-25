import {useState,useEffect} from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./DropDown.scss"

function DropDown({data,selectedItem,onSelectedItem}) {
    const [isOpen, setOpen] = useState(false);
    const [items, setItem] = useState(data);

    
    const toggleDropdown = () => setOpen(!isOpen);
    
    const handleItemClick = (id) => {
       onSelectedItem(id);
       setOpen(false);
    }

    useEffect(() => {
        setItem(data)
    },[data])

    
    return (
      <div className='dropdown'>
        <div className="dropdown_selected" onClick={toggleDropdown}>
          
         {selectedItem && selectedItem.label ? selectedItem.label : ""}
         <KeyboardArrowDownIcon className={isOpen ?`dropdow_selected-icon rt-180` : "dropdow_selected-icon"}/>
        </div>
        <div className={isOpen ? `mini_dropdown-list ${"active"}` : "mini_dropdown-list"}>
         
          {data && data.length > 0 && data.map((item) => <div className="mini_dropdown-item" onClick={() => handleItemClick(item)}>
              {item && item.label ? item.label : ""}
            </div>)}
        </div>
      </div>
    )
}

export default DropDown