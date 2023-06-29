import React from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'



function getButton(type, props) {
    switch (type) {
        case "primary":
            return <PrimaryButton {...props} />
        case "secondary":
            return <SecondaryButton {...props} />
    }
}


const Button = ({ type, ...props }) => {
    return getButton(type, props);
}

export default Button