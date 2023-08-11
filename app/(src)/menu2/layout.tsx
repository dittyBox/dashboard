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

const Menu2Layout = (props: Props) => {
    const menus = useContext(MenusContext);
    const router = useRouter();
    const usePathnm = usePathname();
    const menuItem = _.cloneDeep(menus.menus).find(e=>e.menuId==usePathnm.replaceAll('/',''));
    if(menuItem == undefined){
        return;
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid xs={12} height={"30px"}>
                    <Typography color="burlywood" style={{textAlign:"center",
                    fontSize:"30px", fontWeight:"bold"}} >
                        {menuItem.menuName}
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <div>{props.children}</div>
                </Grid>
            </Grid>
        </div>
    );
};
export default Menu2Layout;