import { Checkbox, Space } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Typography } from 'antd';

const { Title } = Typography;

interface IActionList {
  searches: Record<
    string,
    {
      value: string;
      name: string;
    }[]
  >;
  setSearches: any;
  selected: CheckboxValueType[];
  setSelected: any;
}

export const ActionList = (props: IActionList) => {
  const onCheckboxGroupChange = (values: CheckboxValueType[]) => {
    props?.setSelected(values);
  };

  return (
    <Checkbox.Group
      onChange={onCheckboxGroupChange}
      value={props?.selected}
      style={{ marginLeft: 20 }}
    >
      {Object.keys(props.searches).map((sectionName) => {
        const actions = props.searches[sectionName];
        return (
          <Space
            key={sectionName}
            style={{ marginBottom: 10, marginTop: 10, display: 'flex' }}
            direction="vertical"
            size="small"
          >
            <Title level={5}>{sectionName}</Title>
            {actions.map((action) => (
              <Checkbox
                key={action.value}
                value={action.value}
                style={{ marginLeft: 10 }}
              >
                {action.name}
              </Checkbox>
            ))}
          </Space>
        );
      })}
    </Checkbox.Group>
  );
};
