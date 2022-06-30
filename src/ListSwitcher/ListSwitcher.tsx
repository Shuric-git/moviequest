import { FC } from 'react';
import { Tabs } from 'antd';

import 'antd/dist/antd.css';

const { TabPane } = Tabs;

export const ListSwitcher: FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Search" key="1">
          -
        </TabPane>
        <TabPane tab="Rated" key="2">
          -
        </TabPane>
      </Tabs>
    </div>
  );
};
