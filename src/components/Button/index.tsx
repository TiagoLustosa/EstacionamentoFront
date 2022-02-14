interface ButtonProps {
    onClick?: () => void
    title: string 
    className?: string
}

export const Button = (props: ButtonProps): JSX.Element => {
    return (
    <button type="button" className={props.className} onClick={props.onClick}>
        {props.title}
    </button>
    )
}

export default Button