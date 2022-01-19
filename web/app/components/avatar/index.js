export default function(props) {
    return (
        <img {...props} src={`https://img.boxopened.com/avatars/${props.src}`} />
    )
}