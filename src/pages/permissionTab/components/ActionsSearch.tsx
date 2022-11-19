import { useEffect, useState } from 'react';
import { Checkbox, Input, Space, Select, Typography, Form, Button } from 'antd';
import { useDebounceFn } from 'ahooks';
import { get } from 'lodash';
import {
  ROLE_ACTIONS_MAPPINGS,
  ROLE_TEMPLATE_OPTIONS,
  SECTION_ACTIONS_MAPPINGS,
  getActionsTemplateFromActions,
} from '../const';
import { ISearch } from '../interfaces';

const { Title } = Typography;

interface IActionSearch {}

export const ActionsSearch = (props: IActionSearch) => {
  const [searches, setSearches] = useState<ISearch>(SECTION_ACTIONS_MAPPINGS);

  const [form] = Form.useForm();

  const templates = Form.useWatch('actions-template', form);
  useEffect(() => {
    if (templates) {
      const actions = get(ROLE_ACTIONS_MAPPINGS, templates);
      form.setFieldValue('actions', actions);
    }
  }, [templates, form]);

  const actions = Form.useWatch('actions', form);
  useEffect(() => {
    const roleName = getActionsTemplateFromActions(actions);
    if (roleName) {
      form.setFieldValue('actions-template', roleName);
    } else {
      form.setFieldValue('actions-template', undefined);
    }
  }, [actions, form]);

  const onActionsSearch = (searchStr: string) => {
    if (!searchStr) {
      setSearches(SECTION_ACTIONS_MAPPINGS);
      return;
    }

    const newSearches = Object.keys(searches).reduce((a, sectionName) => {
      const actions = SECTION_ACTIONS_MAPPINGS[sectionName];
      const newActions = actions.filter((action) =>
        action.name.toLowerCase().includes(searchStr.toLowerCase())
      );

      if (!a[sectionName] && newActions.length !== 0) {
        a[sectionName] = newActions;
      }
      return a;
    }, {} as ISearch);
    console.log(newSearches);

    setSearches(newSearches);
  };

  const { run: onDebouncedActionSearch } = useDebounceFn(onActionsSearch, {
    wait: 100,
  });

  return (
    <Form form={form} name="action-search">
      <Form.Item style={{ display: 'inline-block' }}>
        <Input
          placeholder="type and search"
          allowClear
          onChange={(e) => onDebouncedActionSearch(e.target.value)}
          style={{ width: 300, marginLeft: 20, marginTop: 20 }}
        />
      </Form.Item>

      <Form.Item name="actions-template" style={{ display: 'inline-block' }}>
        <Select
          style={{ width: 300, marginLeft: 20, marginTop: 20 }}
          placeholder="Role Template"
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={ROLE_TEMPLATE_OPTIONS}
        />
      </Form.Item>

      <Form.Item name="actions">
        <Checkbox.Group style={{ marginLeft: 20 }}>
          {Object.keys(searches).map((sectionName) => {
            const actions = searches[sectionName];
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
      </Form.Item>

      <Form.Item>
        <Button onClick={() => console.log(form.getFieldsValue())}>
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};
