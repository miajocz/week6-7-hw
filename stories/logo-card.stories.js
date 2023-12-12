import { html } from 'lit';
import '../src/sports-card-2.js';

export default {
  title: 'SportsCard2',
  component: 'sports-card-2',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <sports-card-2
      style="--sports-card-2-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </sports-card-2>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
