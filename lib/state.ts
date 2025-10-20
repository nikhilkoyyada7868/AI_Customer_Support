/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';
import {
  Agent,
  Charlotte,
  Paul,
  Shane,
  Penny,
  Rajesh,
} from './presets/agents';

/**
 * User
 */
export type User = {
  name?: string;
  info?: string;
};

export const useUser = create<
  {
    setName: (name: string) => void;
    setInfo: (info: string) => void;
  } & User
>(set => ({
  name: '',
  info: '',
  setName: name => set({ name }),
  setInfo: info => set({ info }),
}));

/**
 * Agents
 */
const STORAGE_KEY = 'chatterbots-personal-agents';

function getPersonalAgentsFromStorage(): Agent[] {
  try {
    const agentsJSON = localStorage.getItem(STORAGE_KEY);
    if (agentsJSON) {
      return JSON.parse(agentsJSON);
    }
  } catch (e) {
    console.error('Failed to parse personal agents from localStorage', e);
  }
  return [];
}

function savePersonalAgentsToStorage(agents: Agent[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
  } catch (e) {
    console.error('Failed to save personal agents to localStorage', e);
  }
}

function getAgentById(id: string) {
  const { availablePersonal, availablePresets } = useAgent.getState();
  return (
    availablePersonal.find(agent => agent.id === id) ||
    availablePresets.find(agent => agent.id === id)
  );
}

export const useAgent = create<{
  current: Agent;
  availablePresets: Agent[];
  availablePersonal: Agent[];
  setCurrent: (agent: Agent | string) => void;
  addAgent: (agent: Agent) => void;
  update: (agentId: string, adjustments: Partial<Agent>) => void;
}>(set => ({
  current: Rajesh,
  availablePresets: [Rajesh, Paul, Charlotte, Shane, Penny],
  availablePersonal: getPersonalAgentsFromStorage(),

  addAgent: (agent: Agent) => {
    set(state => {
      const newPersonalAgents = [...state.availablePersonal, agent];
      savePersonalAgentsToStorage(newPersonalAgents);
      return {
        availablePersonal: newPersonalAgents,
        current: agent,
      };
    });
  },
  setCurrent: (agent: Agent | string) =>
    set({ current: typeof agent === 'string' ? getAgentById(agent) : agent }),
  update: (agentId: string, adjustments: Partial<Agent>) => {
    set(state => {
      const agent =
        state.availablePersonal.find(a => a.id === agentId) ||
        state.availablePresets.find(a => a.id === agentId);

      if (!agent) return state;

      const updatedAgent = { ...agent, ...adjustments };

      const isPersonalAgent = state.availablePersonal.some(
        a => a.id === agentId
      );

      const newPersonalAgents = state.availablePersonal.map(a =>
        a.id === agentId ? updatedAgent : a
      );

      if (isPersonalAgent) {
        savePersonalAgentsToStorage(newPersonalAgents);
      }

      return {
        ...state,
        availablePresets: state.availablePresets.map(a =>
          a.id === agentId ? updatedAgent : a
        ),
        availablePersonal: newPersonalAgents,
        current: state.current.id === agentId ? updatedAgent : state.current,
      };
    });
  },
}));

/**
 * UI
 */
export const useUI = create<{
  showUserConfig: boolean;
  setShowUserConfig: (show: boolean) => void;
  showAgentEdit: boolean;
  setShowAgentEdit: (show: boolean) => void;
}>(set => ({
  showUserConfig: true,
  setShowUserConfig: (show: boolean) => set({ showUserConfig: show }),
  showAgentEdit: false,
  setShowAgentEdit: (show: boolean) => set({ showAgentEdit: show }),
}));
