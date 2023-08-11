"use client"
import { ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import MenusContext, { DefaultMenu } from '@/app/api/context/menus'
import { useContext } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as _ from "lodash";

interface Props {
    children: ReactNode;
    props: string;
}

const Menu1Layout = (props: Props) => {
    const menus = useContext(MenusContext);
    const router = useRouter();
    const usePathnm = usePathname();
    const menuItem = _.cloneDeep(menus.menus).find(e=>e.menuId==usePathnm.replaceAll('/',''));
    if(menuItem == undefined){
        return;
    }

    return (
            <Grid container minHeight={"calc(100vh - 50px)"}  direction={"column"}
            sx={{marginTop:"48px"}}>
                <Grid>
                    <Typography color="burlywood" style={{textAlign:"center",
                    fontSize:"30px", fontWeight:"bold", height:"50px"}} >
                        {menuItem.menuName}
                    </Typography>
                </Grid>
                <Grid container sx={{height:"calc(100vh - 100px)"}}>
                    {props.children}
                </Grid>
            </Grid>
    );
};
export default Menu1Layout;