const common = `name,
_id,
 id,
 createdAt,
 views,
 license,
 size,
 category,
 approved,
 thumbnail`

const models = `
 ${common},
 unprocessed
 `

const materials = `
  ${common},
  maps,
  sizes
 `

const hdris = common

export const listData = {
  materials,
  models,
  hdris,
}
