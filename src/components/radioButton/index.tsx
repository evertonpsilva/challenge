import React from 'react';
import { Radio, withStyles } from "@material-ui/core";

const RadioButton = withStyles({
    root: {
      color: 'primary',
      '&$checked': {
        color: 'white',
      },
    },
    checked: {},
  })((props: any) => <Radio color="default" {...props} />);

export default RadioButton;