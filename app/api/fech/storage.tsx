export function getMenuStorage(){
  const retrunItems: MenuType[] = [];

  console.log(localStorage.getItem('menus'));
  
  return retrunItems;
}

export function setMenuStorage(items: MenuType[]){
  localStorage.setItem("menus",JSON.stringify(items));
}