import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const Menu2Layout = (props: Props) => {
    return (
        <div>
            <h2 style={{ color: 'skyblue' }}>Menu2 Layout</h2>
            <div>{props.children}</div>
        </div>
    );
};
export default Menu2Layout;