import React from 'react';
import { Card, Space } from 'antd';


const productCard = () => (
  <Space direction="vertical" size={16}>
    <Card title="Default size card" style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>
);

export default productCard; 