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
  }], 
  changeMenus: (vl: MenuType[]) => {}}
)

export const DefaultMenu: MenuType[] = [
  { menuId: 'menu1', menuName: '메뉴1', setTimer: 10, useYn: 'Y', endPoint: '/menu1?mode=play', sort: 1 },
  { menuId: 'menu2', menuName: '메뉴2', setTimer: 10, useYn: 'Y', endPoint: '/menu2?mode=play', sort: 2 },
  { menuId: 'menu3', menuName: '메뉴3', setTimer: 10, useYn: 'Y', endPoint: '/menu3?mode=play', sort: 3 },
]

export default MenusContext;