import React, { useState } from 'react';
import { Input } from 'antd';
import { useDebounceFn } from 'ahooks';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Select } from 'antd';
import { get } from 'lodash';
import { ActionList } from './ActionList';
import {
  ROLE_ACTIONS_MAPPINGS,
  ROLE_TEMPLATE_OPTIONS,
  SECTION_ACTIONS_MAPPINGS,
} from '../const';
import { ISearch } from '../interfaces';

interface IActionSearch {
  onChange?: (v: string) => void;
}

export const ActionsSearch = (props: IActionSearch) => {
  const [searches, setSearches] = useState<ISearch>(SECTION_ACTIONS_MAPPINGS);
  const [selected, setSelected] = useState<CheckboxValueType[]>([]);

  const onActionsSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchStr = e.target.value;
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

    setSearches(newSearches);
  };
  const { run: onDebouncedActionSearch } = useDebounceFn(onActionsSearch, {
    wait: 500,
  });

  const onRoleTemplateChange = (value: string) => {
    if (!value) return;
    setSelected(get(ROLE_ACTIONS_MAPPINGS, value));
  };

  return (
    <>
      <Input
        placeholder="type and search"
        allowClear
        onChange={onDebouncedActionSearch}
        style={{ width: 300, marginLeft: 20, marginTop: 20 }}
      />

      <Select
        style={{ width: 300, marginLeft: 20, marginTop: 20 }}
        placeholder="Role Template"
        onChange={onRoleTemplateChange}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={ROLE_TEMPLATE_OPTIONS}
      />

      <br />

      <ActionList
        searches={searches}
        setSearches={setSearches}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};
