import { defineStore } from 'pinia';
import getGroupList from '@/api/group';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { GroupState, GroupInfo } from './types';

const toOptions = (groupInfos: GroupInfo[]) => {
  const optionList: SelectOptionData[] = [];
  for (let i = 0; i < groupInfos.length; i += 1) {
    const state = groupInfos[i];
    const optionItem: SelectOptionData = { label: `${state.groupName}(${state.groupId})`, value: state.groupId };
    optionList.push(optionItem);
  }
  return optionList;
};

const useGroupStore = defineStore('group', {
  state: (): GroupState => ({}),
  actions: {
    async load() {
      if (this.groupInfos) return;
      const groupInfos = (await getGroupList()) as unknown as GroupInfo[];
      this.groupInfos = groupInfos;
      const groupOptions = toOptions(groupInfos);
      this.groupOptions = groupOptions;
    },
  },
});

export default useGroupStore;
