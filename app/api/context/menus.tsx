import { createContext, useContext } from 'react';
import React, { useState } from 'react';

const MenusContext = createContext({
  menus: [{
    menuId: "",
    menuName: "",
    setTimer: 10,
    useYn: "",
    endPoint: "",
    sort: 1,
    playSort: 1,
  }], 
  changeMenus: (vl: MenuType[]) => {}}
)

export const DefaultMenu: MenuType[] = [
  { menuId: 'menu1', menuName: 'Gauge Chart', setTimer: 10, useYn: 'Y', endPoint: '/menu1?mode=play', sort: 1, playSort: 1 },
  { menuId: 'menu2', menuName: 'bar chart', setTimer: 10, useYn: 'Y', endPoint: '/menu2?mode=play', sort: 2, playSort: 2 },
  { menuId: 'menu3', menuName: 'line chart', setTimer: 10, useYn: 'Y', endPoint: '/menu3?mode=play', sort: 3, playSort: 3 },
]

export default MenusContext;