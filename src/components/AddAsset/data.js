export const defaultJSON = [
  {
    key: 'name',
    description: 'Name of your model',
    mandatory: true,
  },
  {
    key: 'creator.name',
    description: 'Your name',
    mandatory: true,
  },
  {
    key: 'creator.link',
    description: 'Where your name should link to',
    mandatory: true,
  },
  {
    key: 'team.name',
    description: 'If you are working in a team',
    mandatory: false,
  },
  {
    key: 'team.link',
    description: 'Team link',
    mandatory: false,
  },
  {
    key: 'license',
    description: '1 is CC0 and 2 is CC-BY',
    mandatory: true,
  },
  {
    key: 'category',
    description: 'A category for your model',
    mandatory: true,
  },
]

export const pbrJSON = [
  ...defaultJSON,
  {
    key: 'Maps',
    mandatory: true,
    description:
      'All maps you have avaialable, no paths are needed, only filename',
  },
]
