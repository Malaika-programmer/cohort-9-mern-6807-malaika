import {
Card,
Button,
SectionHeading
} from "../../../../../components/ui";

import styles from "./ExportData.module.css";

function ExportData(){

const exports=[

"Download Notes",

"Download Tasks",

"Download Schedule",

"Download Roadmaps",

"Download Profile",

"Download Complete Data"

];

return(

<Card className={styles.card}>

<SectionHeading

eyebrow="Export"

title="Export Your Data"

description="Download your information securely."

align="left"

/>

<div className={styles.grid}>

{

exports.map((item)=>(

<Button

key={item}

variant="outline"

>

{item}

</Button>

))

}

</div>

</Card>

);

}

export default ExportData;