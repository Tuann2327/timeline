import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import { ConfigProvider,theme } from 'antd';
ReactDOM.render(
  
  <ConfigProvider
      theme={{
        "components": {
            "Collapse": {
                padding: 'none',
                headerPadding:'10px 0px',
            }
          }
      }}   
  >
  <Main/>
  </ConfigProvider>,
  document.getElementById('root')
);
