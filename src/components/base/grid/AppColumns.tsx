import { Grid, GridProps } from "@mui/material";

type Props = GridProps

export const AppColumns = ({ children, ...rest }: Props) => {
    return <Grid container spacing={1} sx={{ mt: 0, mb: 0 }} {...rest}>{children}</Grid>
}