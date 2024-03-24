export const Input = ({ id, label, ...props }) => {
    return (
        <p>
            <label htmlFor={id}> {label}</label>
            <input {...props} id={id} name={id} required />
        </p>

    )
}