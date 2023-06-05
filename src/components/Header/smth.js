import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
        {
        key: '4',
        danger: true,
        label: (<a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            Вийти
        </a>),
    },
];
const OutDropdown = () => (
    <Dropdown
        menu={{
            items,
        }}
    >
        <a onClick={(e) => e.preventDefault()}>
            <Space>
                Hover me
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>
);
