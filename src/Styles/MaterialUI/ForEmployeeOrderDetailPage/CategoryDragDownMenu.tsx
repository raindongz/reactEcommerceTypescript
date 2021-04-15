import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {Category} from "../../../Enums/Category";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);
interface categoryDragDownMenuProps{
    categories:Category[];
    callbackFromParent:(returnedCategory:Category)=>void;
}
export default function CategoryDragDownMenu(props:categoryDragDownMenuProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleChange = (event:any) => {
        props.callbackFromParent(event.target.value)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button className={classes.button} onClick={handleOpen}>
                Open the select
            </Button>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    onChange={handleChange}

                >
                    {props.categories.map((category)=>(
                        <MenuItem value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}