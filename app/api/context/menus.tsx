import { createContext, useContext } from 'react';
import React, { useState } from 'react';

const MenusContext = createContext<MenuType[]>(
  [{
    menuId: "",
    menuName: "",
    setTimer: 10,
    useYn: "",
    endPoint: "",
    sort: 1,
  }]
)

export default MenusContext;