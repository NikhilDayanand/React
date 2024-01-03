import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'


const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1 >{title}</h1>
            {/* <h1>Task Tracker</h1> */}
            {location.pathname === "/" && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />}


        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker (default props)',
    subtitle: ''
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

const headingStyle = {
    color: 'green',
    backgroundColor: 'yellow'
}
// CSS in JS
// const headingStyle2 = { color: "blue", backgroundColor: 'black' }


export default Header