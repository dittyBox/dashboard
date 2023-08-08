export declare global {
  interface MenuType {
    menuId: string;
    menuName: string;
    setTimer: number;
    useYn: string;
    endPoint: string;
    sort: number;
    playSort: number;
  };
  interface dragItem {
    type: string;
    id:string;
    index: number;
  }
}