import { Checkbox, Space } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Typography } from 'antd';
import { union, difference, intersection } from 'lodash';
import {
  ALL_ACTION_NAMES,
  getActionsFromSectionActionsMappings,
} from '../const';
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
  // ! very complex process
  const onCheckboxGroupChange = (values: CheckboxValueType[]) => {
    const restActions = difference(
      ALL_ACTION_NAMES,
      getActionsFromSectionActionsMappings(props.searches)
    );
    const currentSelected = intersection(props.selected, restActions);
    props?.setSelected(union(values, currentSelected));
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
