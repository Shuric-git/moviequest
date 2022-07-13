import { FC } from 'react';
import { Tabs } from 'antd';

import { IListSwitcher } from '../interfaces';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

export const ListSwitcher: FC<IListSwitcher> = ({ getRated, searchMovie, search }) => {
  const onChange = (key: string) => {
    if (key === '1') {
      searchMovie(search);
    }
    if (key === '2') {
      getRated();
    }
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Search" key="1">
          <></>
        </TabPane>
        <TabPane tab="Rated" key="2">
          <></>
        </TabPane>
      </Tabs>
    </div>
  );
};
