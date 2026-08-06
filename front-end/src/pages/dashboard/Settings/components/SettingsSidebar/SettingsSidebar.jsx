import PropTypes from "prop-types";

import { settingsContent } from "../../../../../Scripts/Contents/Dashboard/Settings";

import {
Card,
Button
} from "../../../../../components/ui";

import styles from "./SettingsSidebar.module.css";

function SettingsSidebar({

activeSection,

onChange

}){

return(

<Card className={styles.sidebar}>

{

settingsContent.menu.map((item)=>{

const Icon=item.icon;

const active=item.id===activeSection;

return(

<Button

key={item.id}

type="button"

variant={active?"primary":"ghost"}

className={styles.menuButton}

onClick={()=>onChange(item.id)}

>

<Icon size={18}/>

<span>{item.label}</span>

</Button>

);

})

}

</Card>

);

}

SettingsSidebar.propTypes={

activeSection:PropTypes.string.isRequired,

onChange:PropTypes.func.isRequired

};

export default SettingsSidebar;