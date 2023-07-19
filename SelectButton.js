import { makeStyles } from '@material-ui/core'
import React from 'react'

const SelectButton = ({children , selected, onClick}) => {
    const useStyle = makeStyles({
        selectbutton: {
            border: "1px solid gold",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "blue" : "",
            color: selected ? "white" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
              backgroundColor: "blue",
              color: "black",
            },
            width: "22%",
            //   margin: 5,
          },
    });

    const classes = useStyle();
  return (
    <span onClick={onClick} className={classes.selectbutton}> {children}

    </span>
  )
}

export default SelectButton