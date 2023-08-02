import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const Menu3Layout = (props: Props) => {
    return (
        <div>
            <h2 style={{ color: 'skyblue' }}>Menu3 Layout</h2>
            <div>{props.children}</div>
        </div>
    );
};
export default Menu3Layout;