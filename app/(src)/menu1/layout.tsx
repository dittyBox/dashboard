import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    props: string;
}

const Menu1Layout = (props: Props) => {
    return (
        <div>
            <h2 style={{ color: 'skyblue' }}>Menu1 Layout</h2>
            <div>{props.children}</div>
        </div>
    );
};
export default Menu1Layout;