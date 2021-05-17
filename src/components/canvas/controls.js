export const defaultControls = {
  autoRotate: true,
  contactShadow: true,
}

export const lightControls = {
  intensity: {
    value: 0.1,
    min: 0,
    max: 2,
    step: 0.1,
    label: 'light intensity',
  },
  preset: {
    value: 'rembrandt',
    options: ['rembrandt', 'portrait', 'upfront', 'soft'],
  },
  environment: {
    value: 'city',
    options: [
      '',
      'sunset',
      'dawn',
      'night',
      'warehouse',
      'forest',
      'apartment',
      'studio',
      'city',
      'park',
      'lobby',
    ],
  },
}
