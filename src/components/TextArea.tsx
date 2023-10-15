import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"

interface Props {
    type: SectionType,
    loading?: boolean,
    onChange: (value: string) => void,
    value: string
}

const commonStyles = { border: 0, height: '200px' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading: boolean }) => {
    if (type === SectionType.From) return 'Introducir texto'
    if (loading) return 'Cargando...'
    return 'Traducción'
}

export const TextArea = ({ type, loading = false, value, onChange }: Props) => {

    const styles = type === SectionType.From
        ? commonStyles
        : { ...commonStyles, backgroundColor: '#C9C8C8' }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => { 
        onChange(event.target.value)
    }

    return (
        <Form.Control
            autoFocus={type === SectionType.From}
            as="textarea"
            rows={3}
            disabled={type === SectionType.To}
            placeholder={getPlaceholder({ type, loading })}
            style={styles}
            value={value}
            onChange={handleChange}
        />
    )
}