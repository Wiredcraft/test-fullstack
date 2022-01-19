import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './style.less';

const Editor = (props) => {    
    const [value, setValue] = useState(props.value || '');

    const onEditorChange = e => {
        setValue(e.target.value);
        if (props.onChange) {
            props.onChange(e.target.value);
        }
        e.stopPropagation();
    }

    return (
        <div {...props} className={`${styles.editor} ${props.className}`}>
            <div className={styles.container} >
                <TextareaAutosize 
                    className={styles.editor} 
                    minRows={props.minRows}
                    placeholder="内容" 
                    value={value} 
                    onChange={onEditorChange} 
                />
            </div>
        </div>
    )
}

export default Editor;