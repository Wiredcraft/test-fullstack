import React from 'react';
import Cookies from 'universal-cookie';
import styles from "./style.less";

class SimpleMde extends React.Component {
    componentDidMount() {
        this.editor = new SimpleMDE({ 
            element: this.refs.root,
            status: false,
            placeholder: '内容',
            spellChecker: false,
            onUpload: (callback) => {
                this.refs.imageInput.click();
                this.refs.imageInput.onchange = () => {
                    const { files } = this.refs.imageInput;
                    const data = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        data.append(files[i].name, files[i]);
                    }

                    fetch('/api/upload', {
                            headers: {
                                'Accept': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest',
                                'x-csrf-token': (new Cookies()).get('csrfToken')
                            },
                            credentials: 'include',
                            method: 'POST',
                            body: data
                        })
                        .then(res => res.json())
                        .then(res => {
                            this.refs.imageForm.reset();
                            callback(res.data.url);
                        })
                }
            }
        });
        this.editor.codemirror.on("change", this.onChange);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.value !== this.editor.value()) {
            this.editor.value(this.props.value);
        }
    }

    onChange = () => {
        const value = this.editor.value();
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        return (
            <div className={styles.mde} >
                <form ref="imageForm">
                    <input style={{ display: "none" }}  type="file" accept="image/png, image/gif, image/jpeg, image/bmp, image/x-icon" ref="imageInput" />
                </form>
                <textarea style={{ display: "none" }} ref="root" />
            </div>
        )
    }
}

export default SimpleMde;