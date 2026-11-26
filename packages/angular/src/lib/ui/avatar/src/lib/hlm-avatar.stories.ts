import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { avatarContract } from '@surfnet/curve-contracts';
import { HlmAvatar, HlmAvatarImports } from '..';

const meta: Meta<HlmAvatar> = {
  title: 'Components/Avatar',
  component: HlmAvatar,
  decorators: [
    moduleMetadata({
      imports: [HlmAvatarImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: avatarContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=296-5188&t=vT3gKkMDSpQaeqci-4',
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: avatarContract.props.sizes,
      description: avatarContract.props.sizes
        .map((size) => `\`${size}\` — ${avatarContract.docs.sizes[size]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: avatarContract.defaults.sizes },
      },
    },
  },
  args: {
    size: avatarContract.defaults.sizes,
  },
};

export default meta;
type Story = StoryObj<HlmAvatar>;

/** An avatar with an image and a fallback. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-avatar title="${avatarContract.docs.sizes['default']}" ${argsToTemplate(args)}>
        <img hlmAvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ada Lovelace">
        <span hlmAvatarFallback>AL</span>
      </hlm-avatar>
    `,
  }),
};

/** Compact size for dense lists and inline mentions. */
export const Sm: Story = {
  args: { size: 'sm' },
  render: (args) => ({
    props: args,
    template: `
      <hlm-avatar title="${avatarContract.docs.sizes['sm']}" ${argsToTemplate(args)}>
        <img hlmAvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ada Lovelace">
        <span hlmAvatarFallback>SM</span>
      </hlm-avatar>
    `,
  }),
};

/** Large size for profile headers and prominent placements. */
export const Lg: Story = {
  args: { size: 'lg' },
  render: (args) => ({
    props: args,
    template: `
      <hlm-avatar title="${avatarContract.docs.sizes['lg']}" ${argsToTemplate(args)}>
        <img hlmAvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ada Lovelace">
        <span hlmAvatarFallback>LG</span>
      </hlm-avatar>
    `,
  }),
};

/** When the image fails to load, the initials fallback shows. */
export const Fallback: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-avatar ${argsToTemplate(args)}>
        <img hlmAvatarImage src="https://example.com/does-not-exist.jpg" alt="Grace Hopper">
        <span hlmAvatarFallback>GH</span>
      </hlm-avatar>
    `,
  }),
};

/** Stacked avatars with an overflow count. */
export const Group: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-avatar-group>
        <hlm-avatar ${argsToTemplate(args)}>
          <span hlmAvatarFallback>AL</span>
        </hlm-avatar>

        <hlm-avatar ${argsToTemplate(args)}>
          <span hlmAvatarFallback>GH</span>
        </hlm-avatar>

        <hlm-avatar ${argsToTemplate(args)}>
          <span hlmAvatarFallback>KJ</span>
        </hlm-avatar>

        <hlm-avatar-group-count>+3</hlm-avatar-group-count>
      </hlm-avatar-group>
    `,
  }),
};
