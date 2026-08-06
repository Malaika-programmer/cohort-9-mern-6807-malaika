import { useState } from "react";

import {
Card,
SectionHeading,
Button
} from "../../../../../components/ui";

import styles from "./PrivacySettings.module.css";

function PrivacySettings(){

const [privacy,setPrivacy]=useState({

profile:true,

email:false,

phone:false,

search:true,

activity:true

});

const toggle=(key)=>{

setPrivacy((prev)=>({

...prev,

[key]:!prev[key]

}));

/*

Backend

await settingsService.updatePrivacy({

[key]:!privacy[key]

})

*/

};

const options=[

{

key:"profile",

title:"Public Profile",

description:"Allow others to view your public profile."

},

{

key:"email",

title:"Show Email",

description:"Display your email publicly."

},

{

key:"phone",

title:"Show Phone",

description:"Display your phone number."

},

{

key:"search",

title:"Search Visibility",

description:"Allow profile in search results."

},

{

key:"activity",

title:"Activity Visibility",

description:"Show recent activity."

}

];

return(

<Card className={styles.card}>

<SectionHeading

eyebrow="Privacy"

title="Privacy Settings"

description="Control what information other users can see."

align="left"

/>

{

options.map((item)=>(

<div

key={item.key}

className={styles.row}

>

<div>

<h4>{item.title}</h4>

<p>{item.description}</p>

</div>

<Button

variant={

privacy[item.key]

?

"primary"

:

"outline"

}

onClick={()=>toggle(item.key)}

>

{

privacy[item.key]

?

"Enabled"

:

"Disabled"

}

</Button>

</div>

))

}

</Card>

);

}

export default PrivacySettings;