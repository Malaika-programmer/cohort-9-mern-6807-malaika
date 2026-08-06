import {
Card,
Button,
SectionHeading
} from "../../../../../components/ui";

import styles from "./DangerZone.module.css";

function DangerZone(){

return(

<Card className={styles.card}>

<SectionHeading

eyebrow="Danger Zone"

title="Delete or Deactivate Account"

description="These actions are permanent."

align="left"

/>

<div className={styles.actions}>

<Button variant="warning">

Deactivate Account

</Button>

<Button variant="danger">

Delete Account

</Button>

</div>

</Card>

);

}

export default DangerZone;