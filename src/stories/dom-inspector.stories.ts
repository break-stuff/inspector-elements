import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../lib/dom-inspector/dom-inspector.js';
import { getWcStorybookHelpers } from "wc-storybook-helpers";
import type { DomNodeData } from '../lib/dom-inspector/types.js';

const { events, args, argTypes, template } =
  getWcStorybookHelpers("my-element");

interface ObjectInspectorProps {
  expandLevel: number;
  expandPaths: string | Array<string> | undefined;
  name: string | undefined;
  data: DomNodeData;
  showNonenumerable: boolean;
  sortObjectKeys: boolean | ((a: PropertyKey, b: PropertyKey) => number);
}

export default {
  title: 'Components/ix-dom-inspector',
  component: 'ix-dom-inspector',
  tags: ['autodocs'],
  render: ({ name, data, expandLevel, expandPaths }) =>
    html`<ix-dom-inspector
      .name=${name}
      .data=${data}
      .expandLevel=${expandLevel}
      .expandPaths=${expandPaths}
    ></ix-dom-inspector>`,
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
} satisfies Meta<ObjectInspectorProps>;

type Story = StoryObj<ObjectInspectorProps>;

export const MixedNodes: Story = {
  args: {
    name: 'Mixed Nodes',
    data: {
      nodeName: 'div',
      nodeType: 1,
      tagName: 'div',
      attributes: [{ name: 'class', value: 'foo' }],
      childNodes: [
        {
          nodeName: 'span',
          nodeType: 1,
          tagName: 'span',
          attributes: [],
          childNodes: [
            {
              nodeName: '#text',
              nodeType: 3,
              textContent: 'Hello, World!',
            },
          ],
        },
      ],
    },
    expandLevel: 1,
    expandPaths: '$.object',
  },
};

export const TemplateExample: Story = {
  render: (args) => template(args),
  args: {}
}