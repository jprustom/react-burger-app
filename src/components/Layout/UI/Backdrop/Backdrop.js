import React from 'react';
import BackdropClasses from './Backdrop.module.css';

const backdrop=props=>(
    props.showBackdrop
        ?<div 
            className={BackdropClasses.Backdrop}
            onClick={props.backdropClicked}></div>
        :null
)

export default backdrop;