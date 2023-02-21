import { Grid, GridProps } from "@mui/material";

type Props = GridProps

export const AppColumn = ({ children, ...rest }: Props) => {
    return <Grid item sx={{ m: 0, pb: 1 }}  {...rest}>{children}</Grid>
}

export default AppColumn